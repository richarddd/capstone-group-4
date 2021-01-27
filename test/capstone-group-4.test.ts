import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as CapstoneGroup4 from '../lib/stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new CapstoneGroup4.CapstoneStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
