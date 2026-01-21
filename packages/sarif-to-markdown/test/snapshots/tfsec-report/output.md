# Report
## Results

- **[NOTE]** **[aws-cloudwatch-log-group-customer-key]** [[HELP LINK](https://aquasecurity.github.io/tfsec/v1.26.3/checks/aws/cloudwatch/log-group-customer-key/)] `Log group is not encrypted.`
    - https://github.com/owner/repo/blob/master/base/lm-cloudwatch-group.tf#L1-L5
- **[ERROR]** **[aws-ec2-enable-at-rest-encryption]** [[HELP LINK](https://aquasecurity.github.io/tfsec/v1.26.3/checks/aws/ec2/enable-at-rest-encryption/)] `Root block device is not encrypted.`
    - https://github.com/owner/repo/blob/master/base/lm-prx-ec2.tf#L1-L24
- **[ERROR]** **[aws-ec2-enforce-http-token-imds]** [[HELP LINK](https://aquasecurity.github.io/tfsec/v1.26.3/checks/aws/ec2/enforce-http-token-imds/)] `Instance does not require IMDS access to require a token`
    - https://github.com/owner/repo/blob/master/base/lm-prx-ec2.tf#L1-L24
- **[NOTE]** **[aws-ecs-enable-container-insight]** [[HELP LINK](https://aquasecurity.github.io/tfsec/v1.26.3/checks/aws/ecs/enable-container-insight/)] `Cluster does not have container insights enabled.`
    - https://github.com/owner/repo/blob/master/base/lm-prx-ecs.tf#L1-L6
- **[ERROR]** **[aws-iam-no-policy-wildcards]** [[HELP LINK](https://aquasecurity.github.io/tfsec/v1.26.3/checks/aws/iam/no-policy-wildcards/)] `IAM policy document uses sensitive action 'logs:CreateLogGroup' on wildcarded resource 'arn:aws:logs:\*:\*:\*'`
    - https://github.com/owner/repo/blob/master/base/lm-prx-policy.tf#L9-L9
    - https://github.com/owner/repo/blob/master/base/lm-prx-policy.tf#L9-L9
- **[ERROR]** **[aws-s3-block-public-acls]** [[HELP LINK](https://aquasecurity.github.io/tfsec/v1.26.3/checks/aws/s3/block-public-acls/)] `No public access block so not blocking public acls`
    - https://github.com/owner/repo/blob/master/base/lm-prx-vpc-flow-log-s3.tf#L1-L10
- **[ERROR]** **[aws-s3-block-public-policy]** [[HELP LINK](https://aquasecurity.github.io/tfsec/v1.26.3/checks/aws/s3/block-public-policy/)] `No public access block so not blocking public policies`
    - https://github.com/owner/repo/blob/master/base/lm-prx-vpc-flow-log-s3.tf#L1-L10
- **[WARNING]** **[aws-s3-enable-bucket-logging]** [[HELP LINK](https://aquasecurity.github.io/tfsec/v1.26.3/checks/aws/s3/enable-bucket-logging/)] `Bucket does not have logging enabled`
    - https://github.com/owner/repo/blob/master/base/lm-prx-vpc-flow-log-s3.tf#L1-L10
- **[ERROR]** **[aws-s3-encryption-customer-key]** [[HELP LINK](https://aquasecurity.github.io/tfsec/v1.26.3/checks/aws/s3/encryption-customer-key/)] `Bucket does not encrypt data with a customer managed key.`
    - https://github.com/owner/repo/blob/master/base/lm-prx-vpc-flow-log-s3.tf#L12-L19
- **[ERROR]** **[aws-s3-ignore-public-acls]** [[HELP LINK](https://aquasecurity.github.io/tfsec/v1.26.3/checks/aws/s3/ignore-public-acls/)] `No public access block so not ignoring public acls`
    - https://github.com/owner/repo/blob/master/base/lm-prx-vpc-flow-log-s3.tf#L1-L10
- **[ERROR]** **[aws-s3-no-public-buckets]** [[HELP LINK](https://aquasecurity.github.io/tfsec/v1.26.3/checks/aws/s3/no-public-buckets/)] `No public access block so not restricting public buckets`
    - https://github.com/owner/repo/blob/master/base/lm-prx-vpc-flow-log-s3.tf#L1-L10
- **[NOTE]** **[aws-s3-specify-public-access-block]** [[HELP LINK](https://aquasecurity.github.io/tfsec/v1.26.3/checks/aws/s3/specify-public-access-block/)] `Bucket does not have a corresponding public access block.`
    - https://github.com/owner/repo/blob/master/base/lm-prx-vpc-flow-log-s3.tf#L1-L10
- **[ERROR]** **[aws-vpc-no-public-egress-sgr]** [[HELP LINK](https://aquasecurity.github.io/tfsec/v1.26.3/checks/aws/vpc/no-public-egress-sgr/)] `Security group rule allows egress to multiple public internet addresses.`
    - https://github.com/owner/repo/blob/master/base/lm-prx-sg.tf#L34-L34
- **[ERROR]** **[aws-vpc-no-public-ingress-sgr]** [[HELP LINK](https://aquasecurity.github.io/tfsec/v1.26.3/checks/aws/vpc/no-public-ingress-sgr/)] `Security group rule allows ingress from public internet.`
    - https://github.com/owner/repo/blob/master/base/lm-prx-sg.tf#L18-L18



## Suppressed Results

Nothing here.



## Rules information
<!-- Rule Info -->
<details><summary>Rules details</summary>


    - aws-cloudwatch-log-group-customer-key [] 

    > CloudWatch log groups should be encrypted using CMK
,

    - aws-ec2-enable-at-rest-encryption [] 

    > Instance with unencrypted block device.
,

    - aws-ec2-enforce-http-token-imds [] 

    > aws_instance should activate session tokens for Instance Metadata Service.
,

    - aws-ecs-enable-container-insight [] 

    > ECS clusters should have container insights enabled
,

    - aws-iam-no-policy-wildcards [] 

    > IAM policy should avoid use of wildcards and instead apply the principle of least privilege
,

    - aws-s3-block-public-acls [] 

    > S3 Access block should block public ACL
,

    - aws-s3-block-public-policy [] 

    > S3 Access block should block public policy
,

    - aws-s3-enable-bucket-logging [] 

    > S3 Bucket does not have logging enabled.
,

    - aws-s3-encryption-customer-key [] 

    > S3 encryption should use Customer Managed Keys
,

    - aws-s3-ignore-public-acls [] 

    > S3 Access Block should Ignore Public Acl
,

    - aws-s3-no-public-buckets [] 

    > S3 Access block should restrict public bucket to limit access
,

    - aws-s3-specify-public-access-block [] 

    > S3 buckets should each define an aws_s3_bucket_public_access_block
,

    - aws-vpc-no-public-egress-sgr [] 

    > An egress security group rule allows traffic to /0.
,

    - aws-vpc-no-public-ingress-sgr [] 

    > An ingress security group rule allows traffic from /0.


## Tool information
- Name: tfsec
- Organization: undefined
- Version: undefined
