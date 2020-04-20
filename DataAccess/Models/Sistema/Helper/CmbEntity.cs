using System.ComponentModel.DataAnnotations.Schema;

namespace DataAccess.Models.Sistema.Helper
{
	public class CmbEntity
	{
		[Column("Id")]
		public long Id { get; set; }

		[Column("Detalle")]
		public string Detalle { get; set; }
	}
}
