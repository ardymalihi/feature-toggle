using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FeatureToggle.Web.Models;
using Microsoft.Extensions.Configuration;
using Dapper;
using System.Data.SqlClient;
using Microsoft.Extensions.Options;

namespace FeatureToggle.Web.Data
{
    public class FeatureToggleData : IFeatureToggleData
    {
        private IConfiguration _configuration;
        private AppConfig _appConfig;

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

            _appConfig = new AppConfig
            {
                AdminRole = _configuration.GetSection("AppConfig")["AdminRole"],
                ColumnCreatedDate = _configuration.GetSection("AppConfig")["ColumnCreatedDate"],
                ColumnDescription = _configuration.GetSection("AppConfig")["ColumnDescription"],
                ColumnEnabled = _configuration.GetSection("AppConfig")["ColumnEnabled"],
                ColumnId = _configuration.GetSection("AppConfig")["ColumnId"],
                ColumnName = _configuration.GetSection("AppConfig")["ColumnName"],
                ColumnUpdatedDate = _configuration.GetSection("AppConfig")["Columnupdateddate"],
                TableName = _configuration.GetSection("AppConfig")["TableName"],
                ColumnHost = _configuration.GetSection("AppConfig")["ColumnHost"]
            };
        }
        
        public List<FeatureToggleModel> GetFeatureToggles(string host)
        {
            string sql = $@"select 
                            {_appConfig.ColumnId}, 
                            {_appConfig.ColumnName}, 
                            {_appConfig.ColumnDescription}, 
                            {_appConfig.ColumnEnabled}, {_appConfig.ColumnHost}, 
                            {_appConfig.ColumnCreatedDate}, {_appConfig.ColumnUpdatedDate} 
                           from {_appConfig.TableName} 
                           where isnull({_appConfig.ColumnHost},'') = @Host
                           order by {_appConfig.ColumnCreatedDate} desc";

            using (var connection = new SqlConnection(ConnectionString))
            {
                var query = connection.Query<FeatureToggleModel>(sql, new { Host = host??"" });
                return query.ToList();
            }
        }

        public bool DeleteFeatureToggles(int id, string host)
        {
            var sql = $@"delete from {_appConfig.TableName} where {_appConfig.ColumnId} = @Id and {_appConfig.ColumnHost} = @Host";

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
            if (!Exists(model.Name, model.Host))
            {
                var dateTime = DateTime.Now;
                model.CreatedDate = dateTime;
                model.UpdatedDate = dateTime;

                var sql = $@"
                    INSERT INTO {_appConfig.TableName} 
                        ({_appConfig.ColumnName}, {_appConfig.ColumnDescription}, {_appConfig.ColumnEnabled}, {_appConfig.ColumnHost}, {_appConfig.ColumnCreatedDate}) 
                    VALUES 
                        (@Name, @Description, @Enabled, @Host, @CreatedDate);
                    SELECT CAST(SCOPE_IDENTITY() as int)";


                using (var connection = new SqlConnection(ConnectionString))
                {
                    var result = connection.Query<int>(sql, model);

                    model.Id = result.Single();
                }

                return model;
            }
            else
            {
                return new FeatureToggleModel { };
            }
        }

        public bool FlipFeatureToggles(FeatureToggleModel model)
        {
            var sql = $@"update {_appConfig.TableName}  set {_appConfig.ColumnEnabled}  = @Enabled, {_appConfig.ColumnUpdatedDate}  = @UpdatedDate where {_appConfig.ColumnId}  = @Id";

            using (var connection = new SqlConnection(ConnectionString))
            {
                connection.Execute(sql, new
                {
                    Id = model.Id,
                    Enabled = model.Enabled,
                    UpdatedDate = DateTime.Now
                });

                return true;
            }
        }

        private bool Exists(string name, string host)
        {
            string sql = $@"select count(*) from {_appConfig.TableName} where isnull({_appConfig.ColumnName},'') = @Name and isnull({_appConfig.ColumnHost},'') = @Host";

            using (var connection = new SqlConnection(ConnectionString))
            {
                var query = connection.Query<int>(sql, new { Name = name ?? "", Host = host ?? "" });
                return query.FirstOrDefault() > 0;
            }
        }
    }
}
