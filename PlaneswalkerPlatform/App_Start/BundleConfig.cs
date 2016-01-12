using System.Web;
using System.Web.Optimization;

namespace PlaneswalkerPlatform {
    public class BundleConfig {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles) {
            bundles.Add(new ScriptBundle("~/bundles/js").Include(
                "~/Content/js/lib/jquery-2.1.4.min.js",
                "~/Content/js/main.js"));

            bundles.Add(new StyleBundle("~/bundles/css").Include(
                      "~/Content/css/main.css",
                      "~/Content/css/reset.css"));
        }
    }
}
