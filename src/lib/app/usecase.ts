/**
 * UseCase is an abstract class that defines the structure for use cases in the application.
 * Each use case should extend this class and implement the execute method, which takes an input of type Input and returns a Promise of type Output.
 * This class serves as a base for all use cases, ensuring a consistent interface and promoting separation of concerns in the application architecture.
 */
export default abstract class UseCase<Input, Output> {
  abstract execute(input: Input): Promise<Output>
}
