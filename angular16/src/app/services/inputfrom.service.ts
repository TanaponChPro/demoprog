import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, distinctUntilChanged, 
            map, NEVER, Observable, shareReplay, Subject, 
            Subscription, switchMap, tap, withLatestFrom } from 'rxjs';
import { SharedService } from 'src/app/shared.service';
export interface AppState {
    limit: number;
    scantid: string;
    scansno: string;
}

@Injectable({
    providedIn: "root",
})

export class StoreService {

    CloseJobObject = {
        JobNo: null,
        RealJobNo: null,
        TID: null,
        Bank: null,
        SerialNoEDC: null,
        TechnicName: null,
        RecordDateTime: null,
        UpdateDateTime: null,
        JobType: null,
        JobStatus: null,
        Remark: null,
        PhoneNo: null,
        Merchant: null,
        OldSerialNoEDC: null,
        CustomerName: null,
        CustomerPhoneNo: null,
        InputFileName: null,
        OperationDate: null,
        OperationTime: null,
        OperationEndDate: null,
        OperationEndTime: null,
    }

    //Store of state
    private state = new BehaviorSubject<AppState>({
        limit: 0,
        scantid: '',
        scansno: '',
    });

    //Action
    private increaseLimitAction = new Subject<number>();
    private decreaseLimitAction = new Subject<number>();
    private scanTIDAction = new Subject<string>();
    private scanSerialNoAction = new Subject<string>();

    //Selector
    limit$ = this.createSelector(state => state.limit);
    // offset$ = this.createSelector(state => state.offset);
    scantid$ = this.createSelector(state => state.scantid);
    scanSerialNo$ = this.createSelector(state => state.scansno);

    constructor() {
        this.createReducer(this.increaseLimitAction, (state, limit) => {
            state.limit += limit;
            return state;
        })
        this.createReducer(this.decreaseLimitAction, (state, limit) => {
            state.limit -= limit;
            return state;
        })
        this.createReducer(this.scanTIDAction, (state, scantid) => {
            state.scantid = scantid;
            return state;
        })
        this.createReducer(this.scanSerialNoAction, (state, scansno) => {
            state.scansno = scansno;
            return state;
        })
    }

    //Action method
    increaseLimit(limit: number) {
        this.increaseLimitAction.next(limit);
    }
    decreaseLimit(limit: number) {
        this.decreaseLimitAction.next(limit);
      }
    scanTID(scantid: string) {
        this.scanTIDAction.next(scantid);
    }
    scanSerialNo(scansno: string) {
        this.scanSerialNoAction.next(scansno);
    }
    //Reduce คือกระบวนการเปลียนข้อมูลใน state
    private createReducer<T>(action$: Observable<T>, accumlator: (state: AppState, action: T) => AppState) {
        action$.subscribe((action) => {
            const state = { ...this.state.value };
            const newState = accumlator(state, action);
            this.state.next(newState);
        })
    }

    //Selection คือกระบวนการดึงข้อมูลใน state มาเตียมรอแสดงทีหน้าเว็บเพจ
    private createSelector<T>(selector: (state: AppState) => T): Observable<T> {
        return this.state.pipe(
            map(selector),
            distinctUntilChanged(),
            shareReplay(1)
        )
    }

}