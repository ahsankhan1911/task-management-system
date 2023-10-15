export class DateHelper {
  public static addDaysToCurrentInMs(days: number): number {
    return new Date().getTime() + (days * 24 * 60 * 60 * 1000);
  }
}