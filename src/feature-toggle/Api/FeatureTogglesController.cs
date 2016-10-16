using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using FeatureToggle.Web.Models;
using FeatureToggle.Web.Data;
using System;
using System.Net.Http;
using System.Net;

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
