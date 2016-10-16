using FeatureToggle.Web.Models;
using Microsoft.AspNetCore.Mvc;


namespace FeatureToggle.Web.Api
{
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class UsersController : Controller
    {
        
        [HttpGet]
        [Route("current")]
        public UserModel Get()
        {
            return new UserModel { Host = User.Identity.Name };
        }

    }
}
