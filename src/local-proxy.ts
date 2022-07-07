/**
 * @author WMXPY
 * @namespace ClientLocal
 * @description Local Proxy
 */

import { SudoRPCCall, SudoRPCCallProxy, SudoRPCReturn, SudoRPCService } from "@sudorpc/core";

export class SudoRPCLocalProxy<Metadata, Payload, SuccessResult, FailResult>
    extends SudoRPCCallProxy<Metadata, Payload, SuccessResult, FailResult> {

    public static create<Metadata, Payload, SuccessResult, FailResult>(
        service: SudoRPCService<Metadata, Payload, SuccessResult, FailResult>,
    ): SudoRPCLocalProxy<Metadata, Payload, SuccessResult, FailResult> {

        return new SudoRPCLocalProxy(service);
    }

    private readonly _service: SudoRPCService<Metadata, Payload, SuccessResult, FailResult>;

    private _callback: null | (
        (message: SudoRPCReturn<SuccessResult, FailResult>) => void
    ) = null;

    private constructor(
        service: SudoRPCService<Metadata, Payload, SuccessResult, FailResult>,
    ) {

        super();
        this._service = service;
    }

    public send(call: SudoRPCCall<Metadata, Payload>): void {

        this._service.execute(call).then(
            (
                message: SudoRPCReturn<SuccessResult, FailResult>,
            ) => {

                if (this._callback) {
                    this._callback(message);
                }
            },
        );
    }

    public addListener(
        _listenerIdentifier: string,
        callback: (message: SudoRPCReturn<SuccessResult, FailResult>) => void,
    ): void {

        this._callback = callback;
    }

    public removeListener(_listenerIdentifier: string): void {

        this._callback = null;
    }
}
