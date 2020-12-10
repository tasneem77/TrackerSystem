using System;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

//#nullable disable

namespace slnTrackerSystem.Models
{
    public partial class TrackerDBContext : DbContext
    {
        public TrackerDBContext() { }


        public TrackerDBContext(DbContextOptions<TrackerDBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<Role> Roles { get; set; }
        public virtual DbSet<UserRole> UserRoles { get; set; }
        public virtual DbSet<CalendarSetting> CalendarSettings { get; set; }
        public virtual DbSet<Client> Clients { get; set; }
        public virtual DbSet<Employee> Employees { get; set; }
        public virtual DbSet<MileStone> MileStones { get; set; }
        public virtual DbSet<Mstask> Mstasks { get; set; }
        public virtual DbSet<Organization> Organizations { get; set; }
        public virtual DbSet<Problem> Problems { get; set; }
        public virtual DbSet<Project> Projects { get; set; }
        public virtual DbSet<ProjectClientOrganization> ProjectClientOrganizations { get; set; }
        public virtual DbSet<ProjectStakeHolder> ProjectStakeHolders { get; set; }
        public virtual DbSet<ProjectTeamEmployee> ProjectTeamEmployees { get; set; }
        public virtual DbSet<Pteposition> Ptepositions { get; set; }
        public virtual DbSet<ReqCategory> ReqCategories { get; set; }
        public virtual DbSet<ReqImact> ReqImacts { get; set; }
        public virtual DbSet<ReqPeriority> ReqPeriorities { get; set; }
        public virtual DbSet<ReqSubCategory> ReqSubCategories { get; set; }
        public virtual DbSet<RequestDetail> RequestDetails { get; set; }
        public virtual DbSet<RequestLevel> RequestLevels { get; set; }
        public virtual DbSet<RequestMode> RequestModes { get; set; }
        public virtual DbSet<RequestType> RequestTypes { get; set; }
        public virtual DbSet<RequestTypeStatus> RequestTypeStatuses { get; set; }
        public virtual DbSet<StakeHolder> StakeHolders { get; set; }
        public virtual DbSet<TaskMileStoneEmployee> TaskMileStoneEmployees { get; set; }
        public virtual DbSet<Team> Teams { get; set; }
        public virtual DbSet<TechRequest> TechRequests { get; set; }
        public virtual DbSet<TimeSheet> TimeSheets { get; set; }
        public virtual DbSet<Tsstatus> Tsstatuses { get; set; }
        public virtual DbSet<Urgency> Urgencies { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Server=.;Database=TrackerDB;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<Role>(entity =>
                      {
                          entity.Property(e => e.Name).HasMaxLength(50);
                      });

            modelBuilder.Entity<User>(entity =>
            {
                entity.Property(e => e.Username).HasMaxLength(50);
                entity.Property(e => e.Password).HasMaxLength(50);
                entity.Property(e => e.Email).HasMaxLength(320);
            });





            modelBuilder.Entity<CalendarSetting>(entity =>
            {
                entity.Property(e => e.Value).HasMaxLength(100);

                entity.Property(e => e.Name).HasMaxLength(100);
            });


            modelBuilder.Entity<Client>(entity =>
            {
                entity.Property(e => e.ClientCode).HasMaxLength(50);

                entity.Property(e => e.ContactPerson).HasMaxLength(50);

                entity.Property(e => e.Email).HasMaxLength(320);

                entity.Property(e => e.Mobile).HasMaxLength(20);

                entity.Property(e => e.Name).HasMaxLength(50);
            });

            modelBuilder.Entity<Employee>(entity =>
            {
                entity.Property(e => e.Address).HasColumnType("ntext");

                entity.Property(e => e.Dob)
                    .HasColumnType("date")
                    .HasColumnName("DOB");

                entity.Property(e => e.Email).HasMaxLength(320);

                entity.Property(e => e.EmpImg).HasMaxLength(100);

                entity.Property(e => e.Name).HasMaxLength(50);

                entity.Property(e => e.Phone).HasMaxLength(20);

                entity.Property(e => e.WhatsApp).HasMaxLength(20);

                entity.HasOne(d => d.Team)
                    .WithMany(p => p.Employees)
                    .HasForeignKey(d => d.TeamId)
                    .HasConstraintName("FK_Employees_Teams");
            });

            modelBuilder.Entity<MileStone>(entity =>
            {
                entity.Property(e => e.Description).HasColumnType("ntext");

                entity.Property(e => e.EndDate).HasColumnType("date");

                entity.Property(e => e.StartDate).HasColumnType("date");

                entity.Property(e => e.Title).HasMaxLength(200);
            });

            modelBuilder.Entity<Mstask>(entity =>
            {
                entity.ToTable("MSTasks");

                entity.Property(e => e.Brief).HasColumnType("ntext");

                entity.Property(e => e.EndDate).HasColumnType("date");

                entity.Property(e => e.StartDate).HasColumnType("date");

                entity.Property(e => e.Title).HasMaxLength(200);
            });

            modelBuilder.Entity<Organization>(entity =>
            {
                entity.Property(e => e.Name).HasMaxLength(100);
            });

            modelBuilder.Entity<Problem>(entity =>
            {
                entity.Property(e => e.ClosedDate).HasColumnType("date");

                entity.Property(e => e.Description).HasColumnType("ntext");

                entity.Property(e => e.DueDate).HasColumnType("date");

                entity.Property(e => e.Title).HasMaxLength(100);
            });

            modelBuilder.Entity<Project>(entity =>
            {
                entity.Property(e => e.Discription).HasColumnType("ntext");

                entity.Property(e => e.EndDate).HasColumnType("date");

                entity.Property(e => e.Name).HasMaxLength(150);

                entity.Property(e => e.StartDate).HasColumnType("date");
            });

            modelBuilder.Entity<ProjectStakeHolder>(entity =>
            {
                entity.Property(e => e.Shid).HasColumnName("SHId");

                entity.HasOne(d => d.Project)
                    .WithMany(p => p.ProjectStakeHolders)
                    .HasForeignKey(d => d.ProjectId)
                    .HasConstraintName("FK_ProjectStakeHolders_Projects");

                entity.HasOne(d => d.Sh)
                    .WithMany(p => p.ProjectStakeHolders)
                    .HasForeignKey(d => d.Shid)
                    .HasConstraintName("FK_ProjectStakeHolders_StakeHolders");
            });

            modelBuilder.Entity<ProjectTeamEmployee>(entity =>
            {
                entity.Property(e => e.PtepositionId).HasColumnName("PTEPositionId");

                entity.HasOne(d => d.Employee)
                    .WithMany(p => p.ProjectTeamEmployees)
                    .HasForeignKey(d => d.EmployeeId)
                    .HasConstraintName("FK_ProjectTeamEmployees_Employees");

                entity.HasOne(d => d.Project)
                    .WithMany(p => p.ProjectTeamEmployees)
                    .HasForeignKey(d => d.ProjectId)
                    .HasConstraintName("FK_ProjectTeamEmployees_Projects");

                entity.HasOne(d => d.Pteposition)
                    .WithMany(p => p.ProjectTeamEmployees)
                    .HasForeignKey(d => d.PtepositionId)
                    .HasConstraintName("FK_ProjectTeamEmployees_PTEPositions");

                entity.HasOne(d => d.Team)
                    .WithMany(p => p.ProjectTeamEmployees)
                    .HasForeignKey(d => d.TeamId)
                    .HasConstraintName("FK_ProjectTeamEmployees_Teams");
            });

            modelBuilder.Entity<Pteposition>(entity =>
            {
                entity.ToTable("PTEPositions");

                entity.Property(e => e.Name).HasMaxLength(100);
            });

            modelBuilder.Entity<ReqCategory>(entity =>
            {
                entity.Property(e => e.Name).HasMaxLength(50);
            });

            modelBuilder.Entity<ReqImact>(entity =>
            {
                entity.Property(e => e.Name).HasMaxLength(50);
            });

            modelBuilder.Entity<ReqPeriority>(entity =>
            {
                entity.Property(e => e.Name).HasMaxLength(50);
            });

            modelBuilder.Entity<ReqSubCategory>(entity =>
            {
                entity.Property(e => e.Name).HasMaxLength(50);

                entity.HasOne(d => d.ReqCategory)
                    .WithMany(p => p.ReqSubCategories)
                    .HasForeignKey(d => d.ReqCategoryId)
                    .HasConstraintName("FK_ReqSubCategories_ReqCategories");
            });

            modelBuilder.Entity<RequestDetail>(entity =>
            {
                entity.Property(e => e.ActualStartDate).HasColumnType("date");

                entity.Property(e => e.Description).HasColumnType("ntext");

                entity.Property(e => e.PlannedStartDate).HasColumnType("date");

                entity.Property(e => e.Title).HasMaxLength(100);

                entity.HasOne(d => d.Request)
                    .WithMany(p => p.RequestDetails)
                    .HasForeignKey(d => d.RequestId)
                    .HasConstraintName("FK_RequestDetails_TechRequests");

                entity.HasOne(d => d.Status)
                    .WithMany(p => p.RequestDetails)
                    .HasForeignKey(d => d.StatusId)
                    .HasConstraintName("FK_RequestDetails_RequestTypeStatus");
            });

            modelBuilder.Entity<RequestLevel>(entity =>
            {
                entity.Property(e => e.Name).HasMaxLength(50);
            });

            modelBuilder.Entity<RequestMode>(entity =>
            {
                entity.Property(e => e.Name).HasMaxLength(50);
            });

            modelBuilder.Entity<RequestType>(entity =>
            {
                entity.Property(e => e.Name).HasMaxLength(50);
            });

            modelBuilder.Entity<RequestTypeStatus>(entity =>
            {
                entity.ToTable("RequestTypeStatus");

                entity.Property(e => e.Name).HasMaxLength(50);
            });

            modelBuilder.Entity<StakeHolder>(entity =>
            {
                entity.Property(e => e.Mobile).HasMaxLength(20);

                entity.Property(e => e.Name).HasMaxLength(50);
            });

            modelBuilder.Entity<TaskMileStoneEmployee>(entity =>
            {
                entity.HasOne(d => d.Employee)
                    .WithMany(p => p.TaskMileStoneEmployees)
                    .HasForeignKey(d => d.EmployeeId)
                    .HasConstraintName("FK_TaskMileStoneEmployees_Employees");

                entity.HasOne(d => d.MileStone)
                    .WithMany(p => p.TaskMileStoneEmployees)
                    .HasForeignKey(d => d.MileStoneId)
                    .HasConstraintName("FK_TaskMileStoneEmployees_MileStones");

                entity.HasOne(d => d.Task)
                    .WithMany(p => p.TaskMileStoneEmployees)
                    .HasForeignKey(d => d.TaskId)
                    .HasConstraintName("FK_TaskMileStoneEmployees_MSTasks");
            });

            modelBuilder.Entity<Team>(entity =>
            {
                entity.Property(e => e.Name).HasMaxLength(50);
            });

            modelBuilder.Entity<TechRequest>(entity =>
            {
                entity.Property(e => e.CreatedDate).HasColumnType("date");

                entity.Property(e => e.Description).HasColumnType("ntext");

                entity.Property(e => e.Ended).HasMaxLength(20);

                entity.Property(e => e.ReqCode).HasMaxLength(20);

                entity.Property(e => e.Started).HasMaxLength(20);

                entity.Property(e => e.Subject).HasMaxLength(200);

                entity.HasOne(d => d.Category)
                    .WithMany(p => p.TechRequests)
                    .HasForeignKey(d => d.CategoryId)
                    .HasConstraintName("FK_TechRequests_ReqCategories");

                entity.HasOne(d => d.Client)
                    .WithMany(p => p.TechRequests)
                    .HasForeignKey(d => d.ClientId)
                    .HasConstraintName("FK_TechRequests_Clients");

                entity.HasOne(d => d.Impact)
                    .WithMany(p => p.TechRequests)
                    .HasForeignKey(d => d.ImpactId)
                    .HasConstraintName("FK_TechRequests_ReqImacts");

                entity.HasOne(d => d.Organization)
                    .WithMany(p => p.TechRequests)
                    .HasForeignKey(d => d.OrganizationId)
                    .HasConstraintName("FK_TechRequests_Organizations");

                entity.HasOne(d => d.Periority)
                    .WithMany(p => p.TechRequests)
                    .HasForeignKey(d => d.PeriorityId)
                    .HasConstraintName("FK_TechRequests_ReqPeriorities");

                entity.HasOne(d => d.Project)
                    .WithMany(p => p.TechRequests)
                    .HasForeignKey(d => d.ProjectId)
                    .HasConstraintName("FK_TechRequests_Projects");

                entity.HasOne(d => d.RequestLevel)
                    .WithMany(p => p.TechRequests)
                    .HasForeignKey(d => d.RequestLevelId)
                    .HasConstraintName("FK_TechRequests_RequestLevels");

                entity.HasOne(d => d.RequestMode)
                    .WithMany(p => p.TechRequests)
                    .HasForeignKey(d => d.RequestModeId)
                    .HasConstraintName("FK_TechRequests_RequestModes");

                entity.HasOne(d => d.RequestStatus)
                    .WithMany(p => p.TechRequests)
                    .HasForeignKey(d => d.RequestStatusId)
                    .HasConstraintName("FK_TechRequests_RequestTypeStatus");

                entity.HasOne(d => d.RequestType)
                    .WithMany(p => p.TechRequests)
                    .HasForeignKey(d => d.RequestTypeId)
                    .HasConstraintName("FK_TechRequests_RequestTypes");

                entity.HasOne(d => d.SubCategory)
                    .WithMany(p => p.TechRequests)
                    .HasForeignKey(d => d.SubCategoryId)
                    .HasConstraintName("FK_TechRequests_ReqSubCategories");
            });

            modelBuilder.Entity<TimeSheet>(entity =>
            {
                entity.Property(e => e.Comment).HasColumnType("ntext");

                entity.Property(e => e.CompletePercent).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.EndDate).HasColumnType("date");

                entity.Property(e => e.StartDate).HasColumnType("date");

                entity.Property(e => e.Title).HasMaxLength(100);

                entity.HasOne(d => d.Employee)
                    .WithMany(p => p.TimeSheets)
                    .HasForeignKey(d => d.EmployeeId)
                    .HasConstraintName("FK_TimeSheets_Employees");

                entity.HasOne(d => d.Status)
                    .WithMany(p => p.TimeSheets)
                    .HasForeignKey(d => d.StatusId)
                    .HasConstraintName("FK_TimeSheets_TSStatus");

                entity.HasOne(d => d.Task)
                    .WithMany(p => p.TimeSheets)
                    .HasForeignKey(d => d.TaskId)
                    .HasConstraintName("FK_TimeSheets_MSTasks");
            });

            modelBuilder.Entity<Tsstatus>(entity =>
            {
                entity.ToTable("TSStatus");

                entity.Property(e => e.StatusName).HasMaxLength(100);
            });

            modelBuilder.Entity<Urgency>(entity =>
            {
                entity.Property(e => e.Name).HasMaxLength(50);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
