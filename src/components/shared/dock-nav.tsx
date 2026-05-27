'use client'
import React from 'react'
import { Dock } from '../ui/dock'
import DockItem from './dock-item'
import Link from 'next/link'
import { IconCashPlus, IconUser } from '@tabler/icons-react'
import NiceModal from '@ebay/nice-modal-react'
import { Button } from '../ui/button'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useModal } from '@ebay/nice-modal-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog'
import z from 'zod'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '../ui/textarea'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const schema = z.object({
  title: z.string(),
  amount: z.number(),
  description: z.string().optional(),
  category: z.string().optional(),
  type: z.enum(['income', 'expense']),
})

export const TransactionDialog = NiceModal.create(
  ({ name }: { name: string }) => {
    const modal = useModal()

    const method = useForm({
      resolver: zodResolver(schema),
      defaultValues: {},
    })

    const { control } = method

    return (
      <Dialog
        open={modal.visible}
        onOpenChange={(open) => !open && modal.hide()}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Transaction</DialogTitle>
            <DialogDescription>
              Fill out the form below to add a new transaction.
            </DialogDescription>
          </DialogHeader>
          <form>
            <FieldGroup>
              <Controller
                name="title"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-title">
                      Transaction Title
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-demo-title"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter transaction title"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="amount"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-amount">
                      Amount
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-demo-amount"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter amount"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="type"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-type">Type</FieldLabel>
                    <Select
                      {...field}
                      onValueChange={(value) => field.onChange(value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="income">Income</SelectItem>
                          <SelectItem value="expense">Expense</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="description"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-description">
                      Description
                    </FieldLabel>
                    <Textarea
                      {...field}
                      id="form-rhf-demo-description"
                      aria-invalid={fieldState.invalid}
                      placeholder="Optional description"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Button variant="default" size={'lg'}>
                บันทึก
              </Button>
            </FieldGroup>
          </form>
        </DialogContent>
      </Dialog>
    )
  },
)

export default function DockNavigate({ ...props }) {
  const handleOpenModal = () => {
    NiceModal.show(TransactionDialog, { name: 'นักพัฒนาซอฟต์แวร์สุดเจ๋ง' })
  }
  return (
    <Dock {...props} iconDistance={180}>
      <DockItem label="Add Transaction">
        <Button onClick={handleOpenModal} variant="ghost" size={'lg'}>
          <IconCashPlus />
        </Button>
      </DockItem>
      <DockItem label="Profile">
        <Link href="/me">
          <IconUser />
        </Link>
      </DockItem>
    </Dock>
  )
}
