using System;

namespace Infrastructure.Helper.ExtentionMethod
{
     public static class CalculateAge
    {
        public static float CalcAge(this DateTime date)
        {
            int month,year;
            if(DateTime.Today.Month-date.Month<0){
                  month=(DateTime.Today.Month+12)-date.Month;
                  year=DateTime.Today.AddYears(-1).Year-date.Year;
            }
            else{
                  month=DateTime.Today.Month-date.Month;
                  year=DateTime.Today.Year-date.Year;
                if(date.AddYears(year)>DateTime.Today) year--;
              }
              var x=month;
              var y=year;
              float age = (float) Convert.ToDouble($"{year}.{month}");
             return age;
        }
    }
}