import * as cdk from '@aws-cdk/core';
import * as apigatewayv2 from "@aws-cdk/aws-apigatewayv2";
import * as apiIntegrations from "@aws-cdk/aws-apigatewayv2-integrations";
import * as lambda from "@aws-cdk/aws-lambda";
import * as s3 from "@aws-cdk/aws-s3";
import * as iam from "@aws-cdk/aws-iam"
import { HttpMethod } from '@aws-cdk/aws-apigatewayv2';

export class CapstoneStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const bucket = new s3.Bucket(this, "ScaleBucket");


    

    const scaleHandler = new lambda.Function(this, "ScaleHandler", {
      runtime: lambda.Runtime.NODEJS_12_X,
      code: lambda.Code.fromAsset("resources"),
      handler: "scale.main",
      environment: {
        BUCKET: bucket.bucketName
      },
    });

    bucket.grantReadWrite(scaleHandler);
    
  
    const scaleLambdaIntegration = new apiIntegrations.LambdaProxyIntegration({
      handler: scaleHandler,
    });

    const httpApi = new apigatewayv2.HttpApi(this, 'HttpApi', {
      disableExecuteApiEndpoint: false
    });

    httpApi.addRoutes({
      path: '/scale/{proxy+}',
      methods: [ HttpMethod.ANY ],
      integration: scaleLambdaIntegration,
    });
    
  }
}
