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

    private readonly _listeners: Map<string, (message: SudoRPCReturn<SuccessResult, FailResult>) => void>;

    private constructor(
        service: SudoRPCService<Metadata, Payload, SuccessResult, FailResult>,
    ) {

        super();

        this._service = service;

        this._listeners = new Map();
    }

    public send(
        call: SudoRPCCall<Metadata, Payload>,
    ): void {

        this._service.execute(call).then(
            (
                message: SudoRPCReturn<SuccessResult, FailResult>,
            ) => {

                for (const listener of this._listeners.values()) {
                    listener(message);
                }
            },
        );
    }

    public addListener(
        listenerIdentifier: string,
        callback: (message: SudoRPCReturn<SuccessResult, FailResult>) => void,
    ): this {

        this._listeners.set(listenerIdentifier, callback);
        return this;
    }

    public removeListener(
        listenerIdentifier: string,
    ): this {

        this._listeners.delete(listenerIdentifier);
        return this;
    }
}
