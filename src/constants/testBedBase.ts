import { CommonModule } from "@angular/common";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

const testbedBase = {
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    HttpClientTestingModule
  ],
  providers: [

  ]
}

export default testbedBase;