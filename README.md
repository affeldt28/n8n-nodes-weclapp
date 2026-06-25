# n8n-nodes-weclapp

This is an n8n community node. It lets you use weclapp in your n8n workflows.

weclapp is a cloud-based ERP software that helps businesses manage their operations, including sales, inventory, and customer relationships. With this n8n node, you can integrate weclapp into your automated workflows to streamline your business processes.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation)
[Operations](#operations)
[Credentials](#credentials)
[Compatibility](#compatibility)
[Usage](#usage)
[Resources](#resources)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

This node currently supports the following weclapp resources and operations:

### Article

| Operation                   | API                                                                                                                         | Implemented |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------- | ----------- |
| Query articles              | [GET /article](https://www.weclapp.com/api/#get-/article)                                                                   | ✅           |
| Create articles             | [POST /article](https://www.weclapp.com/api/#post-/article)                                                                 | 🚫           |
| Count articles              | [GET /article/count](https://www.weclapp.com/api/#get-/article/count)                                                       | ✅           |
| Query article by ID         | [GET /article/id/{id}](https://www.weclapp.com/api/#get-/article/id/-id-)                                                   | ✅           |
| Update article              | [PUT /article/id/{id}](https://www.weclapp.com/api/#put-/article/id/-id-)                                                   | 🚫           |
| Delete article              | [DELETE /article/id/{id}](https://www.weclapp.com/api/#delete-/article/id/-id-)                                             | 🚫           |
| Change unit                 | [POST /article/id/{id}/changeUnit](https://www.weclapp.com/api/#post-/article/id/-id-/changeUnit)                           | 🚫           |
| Create datasheet PDF        | [POST /article/id/{id}/createDatasheetPdf](https://www.weclapp.com/api/#post-/article/id/-id-/createDatasheetPdf)           | 🚫           |
| Create label PDF            | [POST /article/id/{id}/createLabelPdf](https://www.weclapp.com/api/#post-/article/id/-id-/createLabelPdf)                   | 🚫           |
| Download article image      | [GET /article/id/{id}/downloadArticleImage](https://www.weclapp.com/api/#get-/article/id/-id-/downloadArticleImage)         | 🚫           |
| Download main article image | [GET /article/id/{id}/downloadMainArticleImage](https://www.weclapp.com/api/#get-/article/id/-id-/downloadMainArticleImage) | 🚫           |
| Packaging unit structure    | [GET /article/id/{id}/packagingUnitStructure](https://www.weclapp.com/api/#get-/article/id/-id-/packagingUnitStructure)     | 🚫           |
| Upload article image        | [POST /article/id/{id}/uploadArticleImage](https://www.weclapp.com/api/#post-/article/id/-id-/uploadArticleImage)           | 🚫           |

### User

| Operation             | API                                                                                                       | Implemented |
| --------------------- | --------------------------------------------------------------------------------------------------------- | ----------- |
| Query users           | [GET /user](https://www.weclapp.com/api/#get-/user)                                                       | ✅           |
| Create user           | [POST /user](https://www.weclapp.com/api/#post-/user)                                                     | ✅           |
| Count users           | [GET /user/count](https://www.weclapp.com/api/#get-/user/count)                                           | ✅           |
| Current user          | [GET /user/currentUser](https://www.weclapp.com/api/#get-/user/currentUser)                               | 🚫           |
| Query user by ID      | [GET /user/id/{id}](https://www.weclapp.com/api/#get-/user/id/-id-)                                       | 🚫           |
| Update user           | [PUT /user/id/{id}](https://www.weclapp.com/api/#put-/user/id/-id-)                                       | 🚫           |
| Delete mfa device     | [POST /user/id/{id}/deleteMfaDevice](https://www.weclapp.com/api/#post-/user/id/-id-/deleteMfaDevice)     | 🚫           |
| Invite user           | [POST /user/id/{id}/invite](https://www.weclapp.com/api/#post-/user/id/-id-/invite)                       | 🚫           |
| Read user mfa devices | [GET /user/id/{id}/readMfaDevices](https://www.weclapp.com/api/#get-/user/id/-id-/readMfaDevices)         | 🚫           |
| Soft delete user      | [POST /user/id/{id}/softDelete](https://www.weclapp.com/api/#post-/user/id/-id-/softDelete)               | 🚫           |
| User image            | [GET /user/id/{id}/userImage](https://www.weclapp.com/api/#get-/user/id/-id-/userImage)                   | 🚫           |
| User image thumbnail  | [GET /user/id/{id}/userImageThumbnail](https://www.weclapp.com/api/#get-/user/id/-id-/userImageThumbnail) | 🚫           |

### Recurring Invoice

> [!CAUTION]
> This is an unofficial implementation of the weclapp API. The following operations are implemented. But it's not officially documented in the weclapp API documentation. Use at your own risk.

| Operation                | API                                                                                     | Implemented |
| ------------------------ | --------------------------------------------------------------------------------------- | ----------- |
| Query recurring invoices | [GET /recurringInvoice](https://www.weclapp.com/api/#get-/recurringInvoice)             | ✅           |
| Count recurring invoices | [GET /recurringInvoice/count](https://www.weclapp.com/api/#get-/recurringInvoice/count) | ✅           |

## Credentials

This node uses the **Weclapp API** credential.

You need:

* A weclapp tenant, available at `https://<TENANT>.weclapp.com`
* An API token from your weclapp account

To configure the credential in n8n:

1. Create a new **Weclapp API** credential.
2. Enter your **Tenant**. For `https://example.weclapp.com`, enter `example`.
3. Enter your **API Token**. You can configure it in weclapp under **My settings > API**.
4. Save the credential.

The node sends the token as the `AuthenticationToken` header and calls the weclapp API at `https://<TENANT>.weclapp.com/webapp/api/v2`.

## Compatibility

This package uses the n8n community node API version 1 and depends on `n8n-workflow`.

No specific minimum n8n version is pinned in this package yet.

## Usage

For query operations, use the available query parameters to shape the weclapp request:

* **Page**, **Page Size**, and **Offset** control pagination.
* **Sort** adds one or more sort criteria.
* **Filter Mode** supports basic n8n filters or advanced weclapp filter operators.
* **Properties** limits the returned fields.
* **Include Referenced Entities** includes referenced entities in the response.
* **Serialize Nulls** controls whether null values are included.
* **Additional Properties** is available for article queries.

For the **User > Create** operation, enable **Dry Run** to validate the request without creating the user in weclapp.

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
* [weclapp api documentation](https://www.weclapp.com/api/)
