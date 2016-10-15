using Microsoft.AspNetCore.Mvc;

namespace FeatureToggle.Web.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
