using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json;
using AirLive.Models;
using AirLive.ViewModel;

namespace AirLive.Controllers
{
    public class HomeController : Controller
    {
        [OutputCache(Duration =1200, Location = System.Web.UI.OutputCacheLocation.Any)]
        public async Task<ActionResult> Index()
        {
            AQIView viewModel = new AQIView();
            string responseBody = string.Empty;
            using (HttpClient client = new HttpClient())
            {
                string url = "http://opendata2.epa.gov.tw/AQI.json";

                HttpResponseMessage response = await client.GetAsync(url);
                if (response.IsSuccessStatusCode)
                {}
                responseBody = await response.Content.ReadAsStringAsync();
                
            }
            ViewBag.responseBody = responseBody;
            viewModel.AQIs = JsonConvert.DeserializeObject<List<modelAQI>>(responseBody);
             return View(viewModel);
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}