using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using qTipTesting.Models;

namespace DietMap.v0.Controllers
{
	public class HomeController : Controller
	{
		public ActionResult Index()
		{
			var data = new List<Record>
			{
				new Record { Date = DateTime.Today.AddHours(7), Type = "weight", Name = "Gym Session" },
				new Record { Date = DateTime.Today.AddDays(2).AddHours(19), Type = "weight", Name = "Squash" },
				new Record { Date = DateTime.Today.AddDays(4).AddHours(19), Type = "weight", Name = "Gym Session" },
				new Record { Date = DateTime.Today.AddDays(6).AddHours(11), Type = "weight", Name = "Jog" }
			};

			for (int i = 0; i < 7; i++)
			{
				data.Add(new Record { Date = DateTime.Today.AddDays(i).AddHours(7), Type = "food", Name = "Breakfast" });
				data.Add(new Record { Date = DateTime.Today.AddDays(i).AddHours(12), Type = "food", Name = "Lunch" });
				data.Add(new Record { Date = DateTime.Today.AddDays(i).AddHours(18), Type = "food", Name = "Dinner" });
			}

			return View(data);
		}


		public ActionResult ExerciseWizard()
		{
			return PartialView("_ExerciseWizard");
		}

		public ActionResult RecipeWizard()
		{
			return PartialView("_RecipeWizard");
		}

		public ActionResult About()
		{
			ViewBag.Message = "Your app description page.";

			return View();
		}

		public ActionResult Contact()
		{
			ViewBag.Message = "Your contact page.";

			return View();
		}
	}
}
