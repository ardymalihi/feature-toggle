using FeatureToggle.Web.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Linq;

namespace FeatureToggle.Web.Controllers
{
    public class HomeController : Controller
    {
        private IConfiguration _configuration;

        private string _adminRole
        {
            get
            {
                return _configuration.GetSection("AppConfig")["AdminRole"];
            }
        }

        public ServerConfig ServerConfig
        {
            get
            {
                return new ServerConfig {
                    User = new UserModel {
                        Host = User.Identity.Name.Split(new char[] { '\\' }).Last(),
                        IsAdmin = User.IsInRole(_adminRole)
                    }
                };
            }
        }

        public HomeController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public IActionResult Index()
        {
            return View(this.ServerConfig);
        }
    }
}
