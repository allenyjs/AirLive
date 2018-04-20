using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Threading.Tasks;
using Newtonsoft.Json;
using AirLive.Models;
using System.Web.Caching;
using AirLive.Services;

namespace AirLive.Controllers
{
    public class ValuesController : ApiController
    {
        private static List<modelAQI> sourceAQIs;
        public ValuesController()
        {
            AQIService _AQIService = new AQIService();
            Task.Run(async () =>
            {
                sourceAQIs = await _AQIService.AQIs();
            });
        }

        // GET api/AQIGet
        [HttpGet]
        [Route("api/AQIGet")]
        public async Task<IHttpActionResult> AQIGet(string County= "臺北市", string SiteName="中山")
        {
            try
            {
                List<modelAQI> _AQIs = new List<modelAQI>();
                _AQIs = sourceAQIs;
                var filterResult = _AQIs.Where(m => m.County == County && m.SiteName == SiteName);
                if (filterResult.Any())
                {
                    return Ok(filterResult.First());
                }
            }
            catch (Exception ex)
            {}
            return BadRequest("查無相關資料");
        }

        // GET api/CountysGet
        [HttpGet]
        [Route("api/CountysGet")]
        public async Task<IHttpActionResult> CountysGet()
        {
            try
            {
                List<modelAQI> _AQIs = new List<modelAQI>();
                _AQIs = sourceAQIs;
                var filterResult = _AQIs.Select(m => m.County).Distinct();
                if (filterResult.Any())
                {
                    return Ok(filterResult);
                }
            }
            catch (Exception ex)
            { }
            return BadRequest("查無相關資料");
        }

        // GET api/SidesGet
        [HttpGet]
        [Route("api/SidesGet")]
        public async Task<IHttpActionResult> SidesGet(string County= "臺北市")
        {
            try
            {
                List<modelAQI> _AQIs = new List<modelAQI>();
                _AQIs = sourceAQIs;
                var filterResult = _AQIs.Where(m => m.County == County).Select(m => m.SiteName);
                if (filterResult.Any())
                {
                    return Ok(filterResult);
                }
            }
            catch (Exception ex)
            {}
            return BadRequest("查無相關資料");
        }

    }
}
