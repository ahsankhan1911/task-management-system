export class APIResponse<T> {
  public statusCode: number;
  
  public message: string;
  
  public success: boolean = false;
  
  public data: T;
  
  public time: number;

  public errors?: Array<string>;
  
  constructor(...args: any[]) {
    this.statusCode = args[0];
    this.message = args[2];
    this.errors = args[3];
  
    if (this.statusCode === 200) {
      this.success = true;

      if (args[1]) {
        this.data = args[1];
      }
              
    } 
          
    this.time = new Date().getTime();
  }
}