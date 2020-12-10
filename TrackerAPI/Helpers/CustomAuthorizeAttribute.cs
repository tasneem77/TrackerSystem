

namespace slnTrackerSystem.Helpers
{
    //public class CustomAuthorizeAttribute : AuthorizeAttribute
    //{
        //TrackerDBContext context = new TrackerDBContext();
        //private readonly string[] allowedroles;
        //public CustomAuthorizeAttribute(params string[] roles)
        //{
        //    this.allowedroles = roles;
        //}
        //protected override bool AuthorizeCore(HttpContextBase httpContext)
        //{
        //    bool authorize = false;
        //    var userId = int.Parse(httpContext.Session["UserId"]);
           
          
        //            var userRole = (from u in context.Users.ToList()
        //                            join ur in context.UserRoles on u.Id equals ur.UserId
        //                           join r in context.Roles on ur.RoleId equals r.Id
        //                            where u.Id == userId
        //                            select new 
        //                            {
        //                                r.Name
        //                            }).FirstOrDefault();


        //            foreach (var role in allowedroles)
        //            {
        //                if (role == userRole.Name) return true;
        //            }
        //    return authorize;
        //}

        //protected override void HandleUnauthorizedRequest(AuthorizationContext filterContext)
        //{
        //    filterContext.Result = new RedirectToRouteResult(
        //       new RouteValueDictionary
        //       {
        //            { "controller", "Home" },
        //            { "action", "UnAuthorized" }
        //       });
        //}
    }


    //public class CustomAuthenticationFilter : ActionFilterAttribute, IAuthenticationFilter
    //{
    //    public void OnAuthentication(AuthenticationContext filterContext)
    //    {
           
    //        if (string.IsNullOrEmpty(Convert.ToString(filterContext.HttpContext.Session["UserName"])))
    //        {
    //            filterContext.Result = new HttpUnauthorizedResult();
    //        }
    //    }
    //    public void OnAuthenticationChallenge(AuthenticationChallengeContext filterContext)
    //    {
    //        if (filterContext.Result == null || filterContext.Result is HttpUnauthorizedResult)
    //        {
    
    //        }
    //    }
    //}
//}
