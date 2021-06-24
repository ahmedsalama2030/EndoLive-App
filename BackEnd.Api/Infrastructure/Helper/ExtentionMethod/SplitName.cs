using System.Text.RegularExpressions;

namespace WebApi.helper.ExtensionsMethod
{
    public static class SplitName
    {
        public static string[] getName(this string Fullname)
        {
            var listNames = Regex.Replace(Fullname, " {1,}", " ").Trim().Split(" ");
            return listNames;

        }
    }
}