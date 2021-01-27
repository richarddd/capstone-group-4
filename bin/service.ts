#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { CapstoneStack } from '../lib/stack';

const app = new cdk.App();
new CapstoneStack(app, 'CapstoneStack');
