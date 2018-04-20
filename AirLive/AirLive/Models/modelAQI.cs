using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AirLive.Models
{
    public class modelAQI
    {
        public string SiteName { get; set; }
        public string County { get; set; }
        public string AQI { get; set; }
        public string Pollutant { get; set; }
        public string Status { get; set; }
        public string SO2 { get; set; }
        public string CO { get; set; }
        public string CO_8hr { get; set; }
        public string O3 { get; set; }
        public string O3_8hr { get; set; }
        public string PM10 { get; set; }
        public string NO2 { get; set; }
        public string NOx { get; set; }
        public string NO { get; set; }
        public string WindSpeed { get; set; }
        public string WindDirec { get; set; }
        public string PublishTime { get; set; }
        public string PM10_AVG { get; set; }
        public string Latitude { get; set; }
        public string Longitude { get; set; }
        //public string __invalid_name__PM2.5 { get; set; }
        //public string __invalid_name__PM2.5_AVG { get; set; }
    }
}