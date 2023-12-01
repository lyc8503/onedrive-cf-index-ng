/**fv
* 该文件包含我们使用的API 端点和令牌的配置。
*
* - 如果您是 OneDrive International 用户，则需在此处进行任何更改。
* - 如果您不是 OneDrive for Business 账户的管理员，您可能需要定义自己的 clientId/clientSecret，
* 查看文档查看更多详细信息。
* - 如果您使用的是 E5 订阅 OneDrive for Business 帐户，则您的文件的直接链接与此处不同。
* 在这种情况下，您需要更改 directLinkRegex。
*/
模块。出口= {
  // clientId 和 clientSecret 用于通过 Microsoft Graph API 使用 OAuth 对用户进行身份验证。
  // 如果您可以使用 OneDrive International 的个人 Microsoft 帐户进行身份验证，则无需在此处进行任何更改。
  clientId : '2b12079c-d875-4703-b3ef-62642aa3ce20' ,
  obfuscatedClientSecret : 'U2FsdGVkX189eFM6Gvbl0WnLIrx1oiX8MVfEerJ2PxxSQtC+RqSzSOPbCqOvPTozmpirXohpl0SR+wlvRzXGvg==' ,

  // redirectUri 是用户通过 Microsoft Graph API 进行身份验证后将被重定向到的 URL。
  // 同样，如果您使用 OneDrive International 的个人微软账户，则消耗更改redirectUri。
  重定向Uri：'http://localhost' ,

  // 这些是 OneDrive API 端点的 URL。如果您使用的是 OneDrive International，则无需在此处进行任何更改
  // 或 E5 订阅 OneDrive for Business。如果您使用 OneDrive 世纪互联，您可能需要更改这些。
  authApi：'https://login.microsoftonline.com/common/oauth2/v2.0/token'，
  DriveApi：'https://graph.microsoft.com/v1.0/me/drive'，

  // 这里列出了我们需要的范围，在大多数情况下您也不需要更改它。
  范围：'user.read files.read.alloffline_access'，

  // Cache-Control 标头，请查看 Vercel 文档以获取更多详细信息。默认设置含义：
  // - max-age=0: 您的浏览器没有服务器
  // - s-maxage=0：服务器在边缘保持刷新状态60秒，之后就会稀疏陈旧
  // - stale-while-revalidate：允许在边缘重新验证时提供陈旧内容
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control
  服务器控制头：
}
