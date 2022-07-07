/**
 * @author WMXPY
 * @namespace ClientLocal
 * @description Local Proxy
 * @override Unit Test
 */

import { SudoRPCCallManager } from "@sudorpc/core";
import { expect } from "chai";
import * as Chance from "chance";
import { SudoRPCLocalProxy } from "../../src";
import { createEchoerService } from "../mock/echoer";

describe('Given {SudoRPCLocalProxy} Class', (): void => {

    const chance: Chance.Chance = new Chance('client-local-local-proxy');

    let callManager: SudoRPCCallManager<any, any, any, any> = undefined as any;

    beforeEach((): void => {
        callManager = SudoRPCCallManager.create(
            SudoRPCLocalProxy.create(createEchoerService()),
        );
        callManager.ignite();
    });

    afterEach((): void => {
        callManager.dialDown();
    });

    it('should be able to execute with local proxy', async (): Promise<void> => {

        const key: string = chance.string();
        const value: string = chance.string();

        const result: any = await callManager.makeCall("echo", {}, {
            [key]: value,
        });

        expect(result).to.be.deep.equal({
            echo: {
                [key]: value,
            },
        });
    });
});
