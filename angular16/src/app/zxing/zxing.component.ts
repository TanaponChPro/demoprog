import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BarcodeFormat } from '@zxing/library';
import { BehaviorSubject } from 'rxjs';
import { FormatsDialogComponent } from './formats-dialog/formats-dialog.component';
import { AppInfoDialogComponent } from '../zxing/zxing-info-dialog/app-info-dialog.component';
// import { Output, EventEmitter } from '@angular/core';  // pass data child to parent by tag selector
import { SharedService } from 'src/app/shared.service';   // pass data child to parent by routelink
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-zxing',
  templateUrl: './zxing.component.html',
  styleUrls: ['./zxing.component.scss']
})
export class ZxingComponent {

  availableDevices: MediaDeviceInfo[];
  deviceCurrent: MediaDeviceInfo;
  deviceSelected: string;

  formatsEnabled: BarcodeFormat[] = [
    // BarcodeFormat.CODE_128,
    // BarcodeFormat.DATA_MATRIX,
    // BarcodeFormat.EAN_13,
    // BarcodeFormat.QR_CODE,
    BarcodeFormat.AZTEC,
    BarcodeFormat.CODE_39,
    BarcodeFormat.CODE_128,
    BarcodeFormat.DATA_MATRIX,
    BarcodeFormat.EAN_13,
    BarcodeFormat.EAN_8,
    BarcodeFormat.ITF,
    BarcodeFormat.QR_CODE,
    BarcodeFormat.PDF_417,
    BarcodeFormat.RSS_14,
  ];

  hasDevices: boolean;
  hasPermission: boolean;
  qrResultString: string;

  torchEnabled = false;
  torchAvailable$ = new BehaviorSubject<boolean>(false);
  tryHarder = false;

  ID: any;
  JobNo: any;

  constructor(
    private readonly _dialog: MatDialog,
    private service: SharedService,
    private route: Router,
    private ActiveRoute: ActivatedRoute,
  ) {
    this.ActiveRoute.paramMap.subscribe(params => {
      this.ID = params.get('id');
      this.JobNo = params.get('jobno');
    });
  }

  clearResult(): void {
    this.qrResultString = null || '';
  }

  onCamerasFound(devices: MediaDeviceInfo[]): void {
    this.availableDevices = devices;
    this.hasDevices = Boolean(devices && devices.length);
  }

  onCodeResult(resultString: string) {
    this.qrResultString = resultString;
    this.service.BarQRresult = this.qrResultString;
    this.resultScanCode(resultString);
    // this.service.getBarandQRcode(this.qrResultString); 
    // this.service.BarQRcode$.subscribe(res => {
    //   console.log('zxing scan result: ' + res);
    // })
    // this.route.navigate([`/inputform/${this.ID}/${this.JobNo}/zxing`]);
  }

  onDeviceSelectChange(selected: string) {
    const selectedStr = selected || '';
    if (this.deviceSelected === selectedStr) { return; }
    this.deviceSelected = selectedStr;
    const device = this.availableDevices.find(x => x.deviceId === selected);
    this.deviceCurrent = device! || undefined;
  }

  onDeviceChange(device: MediaDeviceInfo) {
    const selectedStr = device?.deviceId || '';
    if (this.deviceSelected === selectedStr) { return; }
    this.deviceSelected = selectedStr;
    this.deviceCurrent = device || undefined;
  }

  openFormatsDialog() {
    const data = {
      formatsEnabled: this.formatsEnabled,
    };

    this._dialog
      .open(FormatsDialogComponent, { data })
      .afterClosed()
      .subscribe(x => {
        if (x) {
          this.formatsEnabled = x;
        }
      });
  }

  onHasPermission(has: boolean) {
    this.hasPermission = has;
  }

  openInfoDialog() {
    const data = {
      hasDevices: this.hasDevices,
      hasPermission: this.hasPermission,
    };

    this._dialog.open(AppInfoDialogComponent, { data });
  }

  onTorchCompatible(isCompatible: boolean): void {
    this.torchAvailable$.next(isCompatible || false);
  }

  toggleTorch(): void {
    this.torchEnabled = !this.torchEnabled;
  }

  toggleTryHarder(): void {
    this.tryHarder = !this.tryHarder;
  }

  //way 1
  // @Input() count: number;
  // @Input() scanfrom: string;
  // @Output() countChanged: EventEmitter<number> = new EventEmitter();
  // @Output() newItemEvent = new EventEmitter<string>();
  @Output() resultScan = new EventEmitter<string>();

  resultScanCode(value: string) {
    this.resultScan.emit(value);
  }
  // addNewItem(value: string) {
  //   this.newItemEvent.emit(value);
  // }
  // increment() {
  //   this.count++;
  //   this.countChanged.emit(this.count);
  // }
  // decrement() {
  //   this.count--;
  //   this.countChanged.emit(this.count);
  // }

  //way 2:

  //way 3: pass data child to parent 
  // count = 0;

  // increment() {
  //   this.count++;
  // }
  // decrement() {
  //   this.count--;
  // }
}
