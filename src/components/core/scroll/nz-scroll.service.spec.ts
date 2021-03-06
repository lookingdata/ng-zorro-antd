import { ReflectiveInjector } from '@angular/core';
import { PlatformLocation } from '@angular/common';
import { DOCUMENT } from '@angular/common';

import { NzScrollService } from './nz-scroll.service';

describe('NzScrollService', () => {

  const TOP: number = 10;
  let injector: ReflectiveInjector;
  let document: MockDocument;
  let location: MockPlatformLocation;
  let scrollService: NzScrollService;

  class MockDocument {
    body = new MockElement();
    documentElement = new MockDocumentElement();
  }

  class MockDocumentElement {
    scrollTop = jasmine.createSpy('scrollTop');
  }

  class MockElement {
    scrollTop = jasmine.createSpy('scrollTop');
  }

  class MockPlatformLocation {
    hash: string;
  }

  beforeEach(() => {
    spyOn(window, 'scrollBy');
  });

  beforeEach(() => {
    injector = ReflectiveInjector.resolveAndCreate([
      NzScrollService,
      { provide: DOCUMENT, useClass: MockDocument },
      { provide: PlatformLocation, useClass: MockPlatformLocation }
    ]);
    location = injector.get(PlatformLocation);
    document = injector.get(DOCUMENT);
    scrollService = injector.get(NzScrollService);
  });

  describe('#setScrollTop', () => {
    it(`should scroll to window ${TOP} x`, () => {
      scrollService.setScrollTop(window, TOP);
      expect(document.body.scrollTop).toBe(TOP);
    });

    it(`should scroll to dom element ${TOP} x`, () => {
      let el = new MockElement();
      scrollService.setScrollTop(<any>el, TOP);
      expect(el.scrollTop).toBe(TOP);
    });
  });

});
