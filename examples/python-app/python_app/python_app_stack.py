from aws_cdk import Stack
import aws_cdk.aws_lambda as lambda_
import aws_cdk.aws_s3 as s3
import aws_cdk.aws_s3_deployment as s3_deployment
from constructs import Construct
from mrgrain.cdk_esbuild import (
    BuildOptions,
    InlineTypeScriptCode,
    TypeScriptCode,
    TypeScriptSource,
)


class PythonAppStack(Stack):
    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        websiteBundle = TypeScriptSource(
            "lambda-handler/index.ts",
        )

        s3_deployment.BucketDeployment(
            self,
            "Deployment",
            sources=[websiteBundle],
            destination_bucket=s3.Bucket(
                self,
                "Website",
            ),
        )

        lambda_.Function(
            self,
            "Function",
            runtime=lambda_.Runtime.NODEJS_16_X,
            handler="index.handler",
            code=TypeScriptCode(
                "lambda-handler/index.ts",
                build_options=BuildOptions(
                    format="esm", outfile="index.mjs", external=["aws-sdk"]
                ),
            ),
        )

        lambda_.Function(
            self,
            "Function",
            runtime=lambda_.Runtime.NODEJS_16_X,
            handler="index.handler",
            code=InlineTypeScriptCode(
                """
                const hello: string = 'world';
                export function handler() {
                    console.log(hello);
                }
                """
            ),
        )
