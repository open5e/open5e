// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { processMultiTenantRequest, resolveAddionallyAllowedTenantIds, } from "../util/tenantIdUtils";
import { MsalAuthorizationCode } from "../msal/nodeFlows/msalAuthorizationCode";
import { checkTenantId } from "../util/tenantIdUtils";
import { credentialLogger } from "../util/logging";
import { ensureScopes } from "../util/scopeUtils";
import { tracingClient } from "../util/tracing";
const logger = credentialLogger("AuthorizationCodeCredential");
/**
 * Enables authentication to Azure Active Directory using an authorization code
 * that was obtained through the authorization code flow, described in more detail
 * in the Azure Active Directory documentation:
 *
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-oauth2-auth-code-flow
 */
export class AuthorizationCodeCredential {
    /**
     * @hidden
     * @internal
     */
    constructor(tenantId, clientId, clientSecretOrAuthorizationCode, authorizationCodeOrRedirectUri, redirectUriOrOptions, options) {
        checkTenantId(logger, tenantId);
        let clientSecret = clientSecretOrAuthorizationCode;
        if (typeof redirectUriOrOptions === "string") {
            // the clientId+clientSecret constructor
            this.authorizationCode = authorizationCodeOrRedirectUri;
            this.redirectUri = redirectUriOrOptions;
            // in this case, options are good as they come
        }
        else {
            // clientId only
            this.authorizationCode = clientSecretOrAuthorizationCode;
            this.redirectUri = authorizationCodeOrRedirectUri;
            clientSecret = undefined;
            options = redirectUriOrOptions;
        }
        // TODO: Validate tenant if provided
        this.tenantId = tenantId;
        this.additionallyAllowedTenantIds = resolveAddionallyAllowedTenantIds(options === null || options === void 0 ? void 0 : options.additionallyAllowedTenants);
        this.msalFlow = new MsalAuthorizationCode(Object.assign(Object.assign({}, options), { clientSecret,
            clientId,
            tenantId, tokenCredentialOptions: options || {}, logger, redirectUri: this.redirectUri, authorizationCode: this.authorizationCode }));
    }
    /**
     * Authenticates with Azure Active Directory and returns an access token if successful.
     * If authentication fails, a {@link CredentialUnavailableError} will be thrown with the details of the failure.
     *
     * @param scopes - The list of scopes for which the token will have access.
     * @param options - The options used to configure any requests this
     *                TokenCredential implementation might make.
     */
    async getToken(scopes, options = {}) {
        return tracingClient.withSpan(`${this.constructor.name}.getToken`, options, async (newOptions) => {
            const tenantId = processMultiTenantRequest(this.tenantId, newOptions, this.additionallyAllowedTenantIds);
            newOptions.tenantId = tenantId;
            const arrayScopes = ensureScopes(scopes);
            return this.msalFlow.getToken(arrayScopes, Object.assign(Object.assign({}, newOptions), { disableAutomaticAuthentication: this.disableAutomaticAuthentication }));
        });
    }
}
//# sourceMappingURL=authorizationCodeCredential.js.map