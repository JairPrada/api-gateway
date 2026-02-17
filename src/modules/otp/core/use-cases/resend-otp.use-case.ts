export abstract class ResendOtpUseCase {
  abstract execute(): { message: string };
}
