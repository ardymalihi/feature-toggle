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
        private IFeatureToggleData _featureToggleData;
        private IConfiguration _configuration;

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
            if (User.IsInRole(_adminRole))
            {
                return _featureToggleData.DeleteFeatureToggles(id, host);
            }

            return false;
        }

        [HttpPost]
        public int Post([FromBody]FeatureToggleModel model)
        {
            if (User.IsInRole(_adminRole))
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

            return 0;
         }

        [HttpPut]
        public bool Put([FromBody]FeatureToggleModel model)
        {
            if (User.IsInRole(_adminRole))
            {
                return _featureToggleData.FlipFeatureToggles(model);
            }
            else
            {
                return false;
            }
        }

        [HttpGet]
        [Route("{name}")]
        public bool Get(string name, [FromQuery]string host = "")
        {
            return _featureToggleData.HasFeature(name, host);
        }
    }
}
