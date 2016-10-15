using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using FeatureToggle.Web.ViewModels;

namespace FeatureToggle.Web.Api
{
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class FeatureTogglesController : Controller
    {
        private string _machineName;

        public FeatureTogglesController()
        {
            _machineName = System.Environment.MachineName.ToUpper();
        }

        [HttpGet]
        public List<FeatureToggleVm> Get()
        {
            return (new List<FeatureToggleVm> {
                new FeatureToggleVm {
                    Id =1,
                    Name= "Feature 1",
                    Description = "This is a feature 1",
                    Enabled = true,
                    Host = ""
                },
                new FeatureToggleVm {
                    Id =1,
                    Name= "Ardalan Feature 2",
                    Description = "This is a feature 2",
                    Enabled = true,
                    Host = "ARDALAN"
                },
                new FeatureToggleVm {
                    Id =1,
                    Name= "Feature 3",
                    Description = "This is a feature 3",
                    Enabled = true,
                    Host = ""
                },
                new FeatureToggleVm {
                    Id =1,
                    Name= "Reza Feature 360",
                    Description = "This is a feature 3",
                    Enabled = true,
                    Host = "REZA"
                }
            }).Where(o=>o.Host.ToUpper() == _machineName || string.IsNullOrEmpty(o.Host)).ToList();
        }
    }
}
