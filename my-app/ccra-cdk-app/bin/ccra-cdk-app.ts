#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { CcraCdkAppStack } from '../lib/ccra-cdk-app-stack';

const app = new cdk.App();
new CcraCdkAppStack(app, 'CcraCdkAppStack');
