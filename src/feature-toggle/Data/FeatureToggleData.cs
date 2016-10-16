using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FeatureToggle.Web.Models;

namespace FeatureToggle.Web.Data
{
    public class FeatureToggleData : IFeatureToggleData
    {
        private List<FeatureToggleModel> all = new List<FeatureToggleModel> {
                new FeatureToggleModel {
                    Id =1,
                    Name= "Feature 1",
                    Description = "This is a feature 1",
                    Enabled = true,
                    Host = ""
                },
                new FeatureToggleModel {
                    Id =2,
                    Name= "Feature 2",
                    Description = "This is a feature 2",
                    Enabled = false,
                    Host = ""
                },
                new FeatureToggleModel {
                    Id =3,
                    Name= "Feature 3",
                    Description = "This is a feature 3",
                    Enabled = false,
                    Host = ""
                },
                new FeatureToggleModel {
                    Id =4,
                    Name= "Feature 4",
                    Description = "This is a feature 4",
                    Enabled = true,
                    Host = ""
                }
            };

        private List<FeatureToggleModel> my = new List<FeatureToggleModel> {
                new FeatureToggleModel {
                    Id =5,
                    Name= "Feature 1",
                    Description = "This is a feature 1",
                    Enabled = false,
                    Host = "ARDALAN\\Ardalan"
                },
                new FeatureToggleModel {
                    Id =6,
                    Name= "Feature 2",
                    Description = "This is a feature 2",
                    Enabled = true,
                    Host = "ARDALAN\\Ardalan"
                },
                new FeatureToggleModel {
                    Id =7,
                    Name= "Feature 4",
                    Description = "This is a feature 4",
                    Enabled = true,
                    Host = "ARDALAN\\Ardalan"
                }
            };

        public List<FeatureToggleModel> GetFeatureToggles(string host)
        {
            return string.IsNullOrWhiteSpace(host) ? all : my;
        }

        public bool DeleteFeatureToggles(int id, string host)
        {
            if (string.IsNullOrEmpty(host))
            {
                var featureToggle = all.FirstOrDefault(o => o.Id == id);
                all.Remove(featureToggle);
            }
            else
            {
                var featureToggle = my.FirstOrDefault(o => o.Id == id);
                my.Remove(featureToggle);
            }

            return true;
        }

        public bool AddFeatureToggles(FeatureToggleModel model)
        {
            if (string.IsNullOrEmpty(model.Host))
            {
                all.Add(model);
            }
            else
            {
                my.Add(model);
            }

            return true;
        }

        public bool FlipFeatureToggles(FeatureToggleModel model)
        {
            if (string.IsNullOrEmpty(model.Host))
            {
                var featureToggle = all.FirstOrDefault(o => o.Id == model.Id);
                featureToggle.Enabled = !featureToggle.Enabled;
            }
            else
            {
                var featureToggle = my.FirstOrDefault(o => o.Id == model.Id);
                featureToggle.Enabled = !featureToggle.Enabled;
            }

            return true;
        }
    }
}
