using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FeatureToggle.Web.Models
{
    public class AppConfig
    {
        public string AdminRole { get; set; }
        public string TableName { get; set; }
        public string ColumnId { get; set; }
        public string ColumnName { get; set; }
        public string ColumnDescription { get; set; }
        public string ColumnHost { get; set; }
        public string ColumnEnabled { get; set; }
        public string ColumnCreatedDate { get; set; }
        public string ColumnUpdatedDate { get; set; }
    }
}
