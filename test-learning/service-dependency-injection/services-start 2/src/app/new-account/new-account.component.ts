import { Component, EventEmitter, Output } from '@angular/core';
import { LoggingService } from '../logging.service';
import { AccountService } from '../account.service';
// import { LoggingService } from '../logging.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css'],
  // providers: [LoggingService],
})
export class NewAccountComponent {
  // @Output() accountAdded = new EventEmitter<{ name: string; status: string }>();

  constructor(
    private loggingService: LoggingService,
    private accountsService: AccountService
  ) {
    this.accountsService.statusUpdated.subscribe((status: String) =>
      alert('New Status:' + status)
    );
  }

  onCreateAccount(accountName: string, accountStatus: string) {
    this.accountsService.addAccount(accountName, accountStatus);
    //   name: accountName, // this.accountAdded.emit({
    //   status: accountStatus,
    // });

    // const service = new LoggingService();
    // service.logStatusChange(accountStatus);

    // console.log('A server status changed, new status: ' + accountStatus);

    // .this.loggingService.logStatusChange(accountStatus);
  }
}
