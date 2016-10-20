using FeatureToggle.Web.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace FeatureToggle.Web.Api
{
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class UsersController : Controller
    {
        private IConfiguration _configuration;

        private string _adminRole
        {
            get
            {
                return _configuration.GetSection("AppConfig")["AdminRole"];
            }
        }

        public UsersController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        [Route("current")]
        public UserModel Get()
        {
            return new UserModel { Host = User.Identity.Name, IsAdmin = User.IsInRole(_adminRole) };
        }

    }
}
