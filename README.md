# Table of Contents

1. [General Overview of This Tool](#general-overview-of-this-tool)
2. [API Access](#api-access)
   - [Authentication](#authentication)
     - [Get Bearer Token](#get-bearer-token)
   - [Making Requests](#making-requests)
     - [Base URL](#base-url)
3. [Structure in Black Duck](#structure-in-black-duck)
4. [User Requirements](#user-requirements)
   - [Assets](#assets)
   - [Vulnerabilities](#vulnerabilities)
     - [Vulnerabilities Dashboard](#vulnerabilities-dashboard)
     - [Specific Vulnerability](#specific-vulnerability)
5. [API References](#api-references)
6. [Resources](#resources)


## General Overview of This Tool

Black Duck is a tool that manages and profiles your risks in the libraries installed in your project (code base). It checks your components and identifies all the vulnerabilities in your dependencies. It provides data about the risks for both the project and specific components. Additionally, you can check specific components for risks before working with them. Black Duck tracks vulnerabilities, provides full data about them, and explains how they can be fixed. It scans all the packages in your project to ensure comprehensive risk assessment.

## API Access

### Authentication

All API requests require authentication via a Bearer token. You must include this token in the `Authorization` header of each request. The token ensures that the request is authenticated and authorized to access the data.

#### Get Bearer Token

First, we generate a new token if there isn't already an available one (not expired).
Then, we make a POST request to get the Bearer token with an expiration time of approximately 2 hours.
When the Bearer token expires, we need to make a new request to get a new one.

### Making Requests

When making API requests, ensure that you include the Bearer token and specify the required parameters. We always focus on data from the last 24 hours.

#### Base URL

The base URL for all API requests is:
[https://blackduck.vulcancyber.com](https://blackduck.vulcancyber.com)

This base URL will be used as a prefix for all API endpoints.

## Structure in Black Duck

In Black Duck, there are three main entities: projects, components, and vulnerabilities.

  
```
projects:

[
    {
        name,
        riskProfile,
        version, // And more metadata

        components: 
        [
            {
                name,
                origin,
                license,
                securityRiskProfile, // And more risk categories
            
	            vulnerabilities: 
	            [ 
	                {
	                    name,
	                    overallScore,
	                    severity,
	                    attackVector,
	                    solution,
	                    solutionDate
	                }
	            ]
            }
        ]
    }
]
```

  

## User Requirements

Here I discuss all the requirements I found in the Vulcan web and others that I think can be a good addition.

### Assets

This pertains to the Asset tab for the code base. To get the basic details of an asset (if it is not saved yet in our databases). Additionally, we can obtain the project's general risk profile by making this request.

### Vulnerabilities

#### Vulnerabilities Dashboard

In the vulnerabilities dashboard, we want to get just the basic general data about each vulnerability. We can get the vulnerability data after we get the components list, and for every component, we can see the vulnerabilities for it.

For every item in the table, we can separate the display data into 2:

1. Data from Vulcan - source (black duck in this case), asset - the code base we run our API request on, last/first seen, and more.
2. Data from Black Duck - vulnerability name, risk and more we can get for this request.

#### Specific Vulnerability

Vulnerability data - metadata (name, version, etc), severity, and more.
Fixed data - description, how to fix, how many other vulnerabilities will be fixed too (this is done by Vulcan).

> [TIP]
> After we have the specific vulnerability ID we want to check, we can check if there are any other projects that are also affected by this.


## API References

Get Bearer Token:
POST `/api/tokens/authenticate`
Authorization Header: `Authorization: token {token}`

Project basic details:
GET `/api/projects/{projectId}/versions/{versionId}`

Project profile - full risk profile via:
GET `/api/projects/{projectId}/versions/{versionId}/risk-profile`

List of all components in a specific project:
GET `/api/projects/{projectId}/versions/{versionId}/components`

Details about a specific vulnerability (get the id from the request above):
GET `/api/components/{componentId}/vulnerabilities`

Vulnerability affects projects:
GET `/api/vulnerabilities/{vulnerabilityId}/affected-projects`

## Resources

Official documentation - https://blackduck.vulcancyber.com/api-doc/public.html
Synopsys documentation with tutorials - https://sig-product-docs.synopsys.com/bundle/bd-hub/page/SDK/Example_Using_Hub_SDK.html