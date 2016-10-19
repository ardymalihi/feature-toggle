using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FeatureToggle.Web.Models;
using Microsoft.Extensions.Configuration;
using Dapper;
using System.Data.SqlClient;

namespace FeatureToggle.Web.Data
{
    public class FeatureToggleData : IFeatureToggleData
    {
        private IConfiguration _configuration;

        public string ConnectionString
        {
            get
            {
                return _configuration.GetConnectionString("DefaultConnection");
            }
        }

        public FeatureToggleData(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        
        public List<FeatureToggleModel> GetFeatureToggles(string host)
        {
            string sql = @"select Id, Name, Description, Enabled, Host from featuretoggle where isnull(Host,'') = @Host";

            using (var connection = new SqlConnection(ConnectionString))
            {
                var query = connection.Query<FeatureToggleModel>(sql, new { Host = host??"" });
                return query.ToList();
            }
        }

        public bool DeleteFeatureToggles(int id, string host)
        {
            var sql = @"delete from TaxDocuments where Id = @Id and Host = @Host";

            using (var connection = new SqlConnection(ConnectionString))
            {
                connection.Execute(sql, new
                {
                    Id = id,
                    Host = host
                });

                return true;
            }
        }

        public FeatureToggleModel AddFeatureToggles(FeatureToggleModel model)
        {
            var sql = @"
                    INSERT INTO FeatureToggle 
                        (Name, Description, Enabled, Host) 
                    VALUES 
                        (@Name, @Description, @Enabled, @Host);
                    SELECT CAST(SCOPE_IDENTITY() as int)";


            using (var connection = new SqlConnection(ConnectionString))
            {
                var result = connection.Query<int>(sql, model);

                model.Id = result.Single();
            }

            return model;
        }

        public bool FlipFeatureToggles(FeatureToggleModel model)
        {
            var sql = @"update FeatureToggle set Enabled = @Enabled where Id = @Id";

            using (var connection = new SqlConnection(ConnectionString))
            {
                connection.Execute(sql, new
                {
                    Id = model.Id,
                    Enabled = model.Enabled
                });

                return true;
            }
        }
    }
}
