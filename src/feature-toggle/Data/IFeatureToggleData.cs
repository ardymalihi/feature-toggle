using FeatureToggle.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FeatureToggle.Web.Data
{
    public interface IFeatureToggleData
    {
        List<FeatureToggleModel> GetAllFeatureToggles();

        List<FeatureToggleModel> GetMyFeatureToggles(string host);
    }
}
