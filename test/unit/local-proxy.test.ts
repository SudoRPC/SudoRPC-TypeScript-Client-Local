/**
 * @author WMXPY
 * @namespace ClientLocal
 * @description Local Proxy
 * @override Unit Test
 */

import { expect } from "chai";
import * as Chance from "chance";

describe('Given {SudoRPCLocalProxy} Class', (): void => {

    const chance: Chance.Chance = new Chance('placeholder');

    it('Placeholder', (): void => {

        expect(chance.string()).to.be.not.equal(chance.string());
    });
});
