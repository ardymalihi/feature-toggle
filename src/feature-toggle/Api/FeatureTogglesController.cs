using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using FeatureToggle.Web.Models;
using FeatureToggle.Web.Data;

namespace FeatureToggle.Web.Api
{
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class FeatureTogglesController : Controller
    {
        private IFeatureToggleData _featureToggleData;

        public FeatureTogglesController(IFeatureToggleData featureToggleData)
        {
            _featureToggleData = featureToggleData;
        }

        [HttpGet]
        public List<FeatureToggleModel> GetAllFeatureToggles()
        {
            return _featureToggleData.GetAllFeatureToggles();
        }

        [HttpGet]
        [Route("host")]
        public List<FeatureToggleModel> GetMyFeatureToggles()
        {
            return _featureToggleData.GetMyFeatureToggles(User.Identity.Name);
        }
    }
}
