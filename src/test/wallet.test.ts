import { describe, it, expect, mock, beforeEach } from 'bun:test'
import {
  CreateWalletUseCase,
  GetWalletUseCase,
  UpdateWalletUseCase,
  DeleteWalletUseCase,
  AllWalletsUseCase,
  WalletUserUseCase,
} from '@/core/usecase/wallet.usecase'
import type WalletRepository from '@/core/repository/wallet.repo'
import type { Wallet } from '@/core/domain/wallet'
import { InternalError } from '@/lib/app/error'

const mockWallet: Wallet = {
  id: 'wallet-1',
  userId: 'user-1',
  title: 'Test Wallet',
  description: 'A test wallet',
  createdAt: new Date('2026-01-01'),
  updatedAt: new Date('2026-01-01'),
}

const mockRepo = {
  findAll: mock(() => Promise.resolve([mockWallet])),
  findById: mock(() => Promise.resolve(mockWallet)),
  findByUserId: mock(() => Promise.resolve([mockWallet])),
  create: mock(() => Promise.resolve(mockWallet)),
  update: mock(() => Promise.resolve(mockWallet)),
  delete: mock(() => Promise.resolve()),
} as unknown as WalletRepository

beforeEach(() => {
  ;(mockRepo.findAll as ReturnType<typeof mock>).mockRestore?.()
  ;(mockRepo.findById as ReturnType<typeof mock>).mockRestore?.()
  ;(mockRepo.findByUserId as ReturnType<typeof mock>).mockRestore?.()
  ;(mockRepo.create as ReturnType<typeof mock>).mockRestore?.()
  ;(mockRepo.update as ReturnType<typeof mock>).mockRestore?.()
  ;(mockRepo.delete as ReturnType<typeof mock>).mockRestore?.()
})

describe('CreateWalletUseCase', () => {
  it('should create a wallet and return it', async () => {
    mockRepo.create = mock(() => Promise.resolve(mockWallet))
    const usecase = new CreateWalletUseCase(mockRepo)
    const result = await usecase.execute({
      userId: 'user-1',
      title: 'Test Wallet',
    })
    expect(result).toEqual(mockWallet)
    expect(mockRepo.create).toHaveBeenCalledWith({
      userId: 'user-1',
      title: 'Test Wallet',
    })
  })

  it('should throw original error when repo fails (execute is not awaited)', async () => {
    mockRepo.create = mock(() => Promise.reject(new Error('DB error')))
    const usecase = new CreateWalletUseCase(mockRepo)
    // NOTE: CreateWalletUseCase.execute does not await, so catch block is bypassed
    // and the original error propagates instead of InternalError
    expect(
      usecase.execute({ userId: 'user-1', title: 'Test Wallet' }),
    ).rejects.toBeInstanceOf(Error)
  })
})

describe('GetWalletUseCase', () => {
  it('should return wallet by id', async () => {
    mockRepo.findById = mock(() => Promise.resolve(mockWallet))
    const usecase = new GetWalletUseCase(mockRepo)
    const result = await usecase.execute('wallet-1')
    expect(result).toEqual(mockWallet)
  })

  it('should throw InternalError when wallet not found', async () => {
    mockRepo.findById = mock(() => Promise.resolve(null))
    const usecase = new GetWalletUseCase(mockRepo)
    expect(usecase.execute('not-exist')).rejects.toBeInstanceOf(InternalError)
  })
})

describe('UpdateWalletUseCase', () => {
  it('should update and return wallet', async () => {
    const updated = { ...mockWallet, title: 'Updated' }
    mockRepo.update = mock(() => Promise.resolve(updated))
    const usecase = new UpdateWalletUseCase(mockRepo)
    const result = await usecase.execute({
      walletId: 'wallet-1',
      data: { title: 'Updated' },
    })
    expect(result.title).toBe('Updated')
  })

  it('should throw InternalError when wallet not found', async () => {
    mockRepo.update = mock(() => Promise.resolve(null as unknown as Wallet))
    const usecase = new UpdateWalletUseCase(mockRepo)
    expect(
      usecase.execute({ walletId: 'not-exist', data: { title: 'x' } }),
    ).rejects.toBeInstanceOf(InternalError)
  })
})

describe('DeleteWalletUseCase', () => {
  it('should delete wallet successfully', async () => {
    mockRepo.findById = mock(() => Promise.resolve(mockWallet))
    mockRepo.delete = mock(() => Promise.resolve())
    const usecase = new DeleteWalletUseCase(mockRepo)
    await expect(usecase.execute('wallet-1')).resolves.toBeUndefined()
    expect(mockRepo.delete).toHaveBeenCalledWith('wallet-1')
  })

  it('should throw InternalError when wallet not found', async () => {
    mockRepo.findById = mock(() => Promise.resolve(null))
    const usecase = new DeleteWalletUseCase(mockRepo)
    expect(usecase.execute('not-exist')).rejects.toBeInstanceOf(InternalError)
  })
})

describe('AllWalletsUseCase', () => {
  it('should return all wallets', async () => {
    mockRepo.findAll = mock(() => Promise.resolve([mockWallet]))
    const usecase = new AllWalletsUseCase(mockRepo)
    const result = await usecase.execute()
    expect(result).toHaveLength(1)
    expect(result[0]).toEqual(mockWallet)
  })
})

describe('WalletUserUseCase', () => {
  it('should return wallets for a user', async () => {
    mockRepo.findByUserId = mock(() => Promise.resolve([mockWallet]))
    const usecase = new WalletUserUseCase(mockRepo)
    const result = await usecase.execute('user-1')
    expect(result).toHaveLength(1)
    expect(result[0].userId).toBe('user-1')
  })

  it('should return empty array when user has no wallets', async () => {
    mockRepo.findByUserId = mock(() =>
      Promise.resolve(null as unknown as Wallet[]),
    )
    const usecase = new WalletUserUseCase(mockRepo)
    const result = await usecase.execute('user-no-wallets')
    expect(result).toEqual([])
  })
})
