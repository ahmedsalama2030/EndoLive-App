namespace Core.Interfaces.Common.UGIReport
{
    public interface IBaseUGIReport
    {
        string Indications { get; set; }
        string Esophagus { get; set; }
        string Stomach { get; set; }
        string Pylorus { get; set; }
        string Duodenum { get; set; }
        string Conclusion { get; set; }
    }
}