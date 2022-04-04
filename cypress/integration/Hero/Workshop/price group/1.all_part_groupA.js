/// <reference types="cypress" />

context("Warehouse", () => {
  it("group A", () => {
    cy.pause()
    cy.login("test2.2329436448013107", "1234");

    // เพิ่มยาง
    cartiees();
    cy.pause()

    // เพิ่มอะไหล่
    parts()
    cy.pause()

    // เพิ่มของเหลว
    liquid()
    cy.pause()

    // เพิ่มแม็ก
    mag()
  });
});
// เพิ่มยางกลุ่มราคา
const cartiees = () => {
  cy.get("#nav-item-6").click({ force: true });
  cy.get("#tab-inventory").click({ force: true });
  cy.wait(2000);
  cy.get("#btn-addInventory").click({ force: true });
  cy.get("#tab-TIRE").click({ force: true });

  taxCartiees(getRandomNumberCartiees(0, 10));
  taxCartiees1(getRandomNumberCartiees(0, 10));
  taxCartiees2(getRandomNumberCartiees(0, 10));
  taxCartiees3(getRandomNumberCartiees(0, 10));
  taxCartiees4(getRandomNumberCartiees(0, 10));

  cy.get("#txtSelectWidth").click().type("{downarrow}{downarrow}{enter}");
  cy.get("#txtSelectSeries").click().type("10.5").type("{downarrow}{downarrow}{enter}");
  cy.get("#txtSelectRim").click().type("{downarrow}{downarrow}{enter}");

  cy.get("#btnnextTirestep").click();

  // รายละเอียดราคา
  cy.get("#salesPriceTire").clear().type("100");
  cy.get('#TIRE > .col-xl-12 > .col-12 > .fromitem > .row.mt-5 > .col-sm-auto > .btn-search').click()
  cy.get('.col > .form-control').click().type("A")
  cy.get('.modal-footer > .btn-confirm').click()
  cy.get('.swal2-confirm').click()
  cy.get('.row.mt-2 > .col-12 > #liquid-price0').click().type("200")

  cy.get('#tiredot-0').clear().type("0319");
  cy.get('#tireamount-0').clear().type("50");
  cy.get("#saveInventoryTire").click();

  cy.get(".swal2-confirm").click();
  cy.get("#tab-TIRE").click({ force: true });
};

const getRandomNumberCartiees = (min, max) => {
  0, 0;
  return Math.random() * (max - min) + min;
};
const taxCartiees = (textNo) => {
  cy.get("#ItemCodeTire").type("ยางกลุ่มราคา A").type(textNo);
};
const taxCartiees1 = (textNo) => {
  cy.get("#brandTire").type("ยางกลุ่มราคา A").type(textNo);
};
const taxCartiees2 = (textNo) => {
  cy.get("#itemtagTire").type("ยางกลุ่มราคา A").type(textNo);
};
const taxCartiees3 = (textNo) => {
  cy.get("#skuTire").type("ยางกลุ่มราคา A").type(textNo);
};
const taxCartiees4 = (textNo) => {
  cy.get("#itemDescriptionTire").type("ยางกลุ่มราคา A").type(textNo);
};

// เพิ่มอะไหล่กลุ่มราคา
const parts = () => {
  cy.get("#nav-item-6").click({ force: true });
  cy.get("#tab-inventory").click({ force: true });
  cy.get("#btn-addInventory").click({ force: true });
  cy.get("#tab-PART").click({ force: true });

  taxParts(getRandomNumberParts(1, 10));
  cy.get("#fitmentDetail").click().type("{downarrow}{enter}");
  taxParts1(getRandomNumberParts(1, 10));
  taxParts2(getRandomNumberParts(1, 10));
  taxParts3(getRandomNumberParts(1, 10));
  cy.get("#itemDescription").type("test");

  cy.get("#btnNextPart").click();

  // รายละเอียดราคา
  cy.get("#amountRemainStock").clear().type("10");
  cy.get("#unit").click().type("{downarrow}{enter}");
  cy.get('.form-row.mt-2 > .form-group > .mt-2 > #salesPricePart').clear().type("500");
  cy.get('#PART > .col-xl-12 > .col-md-12 > .fromitem > .form-row.mt-2 > :nth-child(2) > #liquid-price0')
    .click().type("200")
  cy.get("#btnsaveInventoryPart").click();

  cy.get(".swal2-confirm").click();
  cy.get("#tab-PART").click({ force: true });
};

const getRandomNumberParts = (min, max) => {
  0, 0;
  return Math.random() * (max - min) + min;
};

const taxParts = (textNo) => {
  cy.get("#itemName").type("อะไหล่กลุ่มราคา").type(textNo);
};
const taxParts1 = (textNo) => {
  cy.get("#brand").type("อะไหล่กลุ่มราคา").type(textNo);
};
const taxParts2 = (textNo) => {
  cy.get("#manufacturerNo").type("อะไหล่กลุ่มราคา").type(textNo);
};
const taxParts3 = (textNo) => {
  cy.get("#oeNo").type("อะไหล่กลุ่มราคา").type(textNo);
};

// เพิ่มของเหลวกลุ่มราคา
const liquid = () => {
  cy.get("#nav-item-6").click({ force: true });
  cy.get("#tab-inventory").click({ force: true });
  cy.wait(2000);
  cy.get("#btn-addInventory").click({ force: true });
  cy.get('#tab-LIQUID').click({ force: true });

  // taxliquid(getRandomNumberliquid(0, 10));
  cy.get('#lidquid-name').click().type("น้ำมันเครื่อง").type("{downarrow}{downarrow}{enter}")
  taxliquid1(getRandomNumberliquid(0, 10));
  taxliquid2(getRandomNumberliquid(0, 10));

  cy.get('.row.mt-3 > :nth-child(2) > #btnNextPart').click({ force: true })

  // รายละเอียดราคา
  cy.get(':nth-child(1) > #liquid-count').click({ force: true }).clear({ force: true }).type("500");
  cy.get('.mt-2 > #liquid-count').type("1")
  cy.get('#liquid-unit').type("อัน").type("{downarrow}{downarrow}{enter}")
  cy.get('#liquid-price').clear().type("1000");
  cy.get('#LIQUID > .col-xl-12 > .col-md-12 > .fromitem > :nth-child(4) > :nth-child(2) > #liquid-price0')
    .click().type("200")
  cy.get('#LIQUID > .col-xl-12 > .col-12 > :nth-child(3) > :nth-child(2) > #btnsaveInventoryPart').click()

  cy.get(".swal2-confirm").click();
  cy.get("#tab-TIRE").click({ force: true });
}
const getRandomNumberliquid = (min, max) => {
  0, 0;
  return Math.random() * (max - min) + min;
};
const taxliquid1 = (textNo) => {
  cy.get('#liquid-brand').type("ของเหลวกลุ่มราคา").type(textNo);
};
const taxliquid2 = (textNo) => {
  cy.get('#liquid-manufacturerNo').type(textNo);
};
const taxliquid3 = (textNo) => {
  cy.get(':nth-child(4) > .mt-2 > #oeNo').type("ของเหลวกลุ่มราคา").type(textNo);
};
const taxliquid4 = (textNo) => {
  cy.get('#liquid-fuel').type("ของเหลวกลุ่มราคา").type(textNo);
};
// เพิ่มแม็กกลุ่มราคา
const mag = () => {
  cy.get("#nav-item-6").click({ force: true });
  cy.get("#tab-inventory").click({ force: true });
  cy.get("#btn-addInventory").click({ force: true });
  cy.get("#tab-MAG").click({ force: true });

  // กรอกรายละเอียดสินค้า
  cy.get("#ItemCodeMag").type("แม็กกลุ่มราคา");
  cy.get("#brandMag").type("แม็กกลุ่มราคา");
  cy.get("#cb-0").type("60");
  cy.get("#pcdhod-0").type("50");
  cy.get("#pcdsize-0").type("50");
  cy.get("#pcddec-0").type("50");
  cy.get("#itemoffsetMag").type("500");
  cy.get("#itemcolorMag").type("white");
  cy.get("#model_mag").type("50");
  cy.get("#skuMag").type("677");
  cy.get("#widthMag").click().type("45");
  cy.get("#rimMag").click().type("10");

  cy.get("#btnnextMag").click();

  // รายละเอียดราคา

  cy.get("#amountMag").clear().type("50");
  cy.get("#salesPriceMag").clear().type("300");
  cy.get('#MAG > .col-xl-12 > .col-md-12 > .fromitem > :nth-child(4) > :nth-child(2) > #liquid-price0')
    .click().type("200")

  cy.get("#btnsaveInventorymag").click();

  cy.get(".swal2-confirm").click();
  cy.get("#tab-MAG").click({ force: true });
}