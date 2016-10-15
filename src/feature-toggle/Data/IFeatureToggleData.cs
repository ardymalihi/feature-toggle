using FeatureToggle.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FeatureToggle.Web.Data
{
    public interface IFeatureToggleData
    {
        List<FeatureToggleModel> GetFeatureToggles(string host);

        bool DeleteFeatureToggles(int id, string host);
    }
}
