import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { AuthService } from '../services/auth.service';
import { ProgramApiResponse, VirtualProgram } from '../shared/program.model';
import { ProjectApiResponse, VirtualProject } from '../shared/project.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  program: VirtualProgram[] = [];
  projects: VirtualProject[] = [];
  projectName: string[] = [];
  selectProgram: VirtualProgram[] = [];
  availableProject: VirtualProject[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getProgram().subscribe((res) => {
      this.program = res.virtualProgramList;

      console.log(this.projectName);
      console.log(this.program);
      console.log(res);
    });

    this.authService.getProjects().subscribe((res) => {
      this.projects = res.virtualProgramDetails;
      console.log(this.projects);
    });
  }

  onChange(data: MatSelectChange) {
    this.selectProgram = data.value;
    console.log(data);

    this.projects.forEach((data) => {
      this.selectProgram.forEach((res) => {
        if (
          data.programID == res.programId &&
          this.availableProject.findIndex(
            (ap) => ap.projectName == data.projectName
          ) == -1
        ) {
          this.availableProject.push(data);
        }
      });
    });
  }
}
