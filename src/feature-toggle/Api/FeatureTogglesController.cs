using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using FeatureToggle.Web.Models;
using FeatureToggle.Web.Data;
using System;
using System.Net.Http;
using System.Net;
using Microsoft.Extensions.Configuration;

namespace FeatureToggle.Web.Api
{
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class FeatureTogglesController : Controller
    {
        private IConfiguration _configuration;
        private IFeatureToggleData _featureToggleData;

        private string _adminRole
        {
            get
            {
                return _configuration.GetSection("AppConfig")["AdminRole"];
            }
        }

        public FeatureTogglesController(IConfiguration configuration, IFeatureToggleData featureToggleData)
        {
            _configuration = configuration;
            _featureToggleData = featureToggleData;
        }

        [HttpGet]
        public List<FeatureToggleModel> Get(string host)
        {
            return _featureToggleData.GetFeatureToggles(host);
        }

        [HttpDelete]
        public bool Delete(int id, string host)
        {
            return _featureToggleData.DeleteFeatureToggles(id, host);
        }

        [HttpPost]
        public int Post([FromBody]FeatureToggleModel model)
        {
            var result = _featureToggleData.AddFeatureToggles(model);
            if (result != null)
            {
                return result.Id;
            }
            else
            {
                return 0;
            }
         }

        [HttpPut]
        public bool Put([FromBody]FeatureToggleModel model)
        {
            return _featureToggleData.FlipFeatureToggles(model);
        }
    }
}
