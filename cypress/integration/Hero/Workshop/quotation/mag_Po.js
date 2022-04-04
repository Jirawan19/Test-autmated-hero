/// <reference types="cypress" />

context("mag_po", () => {
    it("quotation mag", () => {
        cy.pause()
        cy.login("test2.2329436448013107", "1234");
        // add_mag()
        quotation()
    })
    it("start_job", () => {
        cy.pause()
        cy.login("test2.2329436448013107", "1234");
        start_job()
    })
    it("start_job1", () => {
        cy.pause()
        cy.login("test2.2329436448013107", "1234");
        start_job1()
        check_job()
    })
})
const add_mag = () => {
    cy.get("#nav-item-6").click({ force: true });
    cy.get("#tab-inventory").click({ force: true });
    cy.get("#btn-addInventory").click({ force: true });
    cy.get("#tab-MAG").click({ force: true });

    cy.get("#ItemCodeMag").type("เพิ่มแม็ก");
    cy.get("#brandMag").type("เพิ่มแม็ก 90");
    cy.get("#cb-0").type("69");
    cy.get("#pcdhod-0").type("50");
    cy.get("#pcdsize-0").type("50");
    cy.get("#pcddec-0").type("50");
    cy.get("#itemoffsetMag").type("59");
    cy.get("#itemcolorMag").type("white");
    cy.get("#model_mag").type("50");
    cy.get("#skuMag").type("65997");
    cy.get("#widthMag").click().type("45");
    cy.get("#rimMag").click().type("10");

    cy.get("#btnnextMag").click();

    cy.get("#amountMag").clear().type("50");
    cy.get("#salesPriceMag").clear().type("300");

    cy.get("#btnsaveInventorymag").click();

    cy.get(".swal2-confirm").click();
    cy.get("#tab-MAG").click({ force: true });
}
const quotation = () => {
    cy.get('#nav-item-2').click()
    cy.get('#tab-quotation').click({ force: true })

    cy.wait(2000)
    cy.get('#btn-addRepairJob').click({ force: true })
    cy.wait(1000)
    cy.get('#selSelectCar').click({ force: true }).type("9", { force: true }).wait(1000).type("{downarrow}{enter}", { force: true })

    // เพิ่มสินค้า
    cy.get('.col-xl-3 > .btn').click({ force: true })
    cy.get('#tab-MAG').click({ force: true })
    cy.get('#pane-MAG > .d-xl-block > .table > tbody > :nth-child(1) > .text-left').should("contain.text", "เพิ่มแม็ก")
    cy.get('#addMagPo-13047').click({ force: true })
    cy.get('#Product > .modal-dialog > .modal-content > .modal-header > .close').click()

    //เช็คสินค้า
    cy.get('#magdata-0').should("contain.text", "แม็ก")

    // ส่วนลดรายชิ้น
    cy.get(':nth-child(6) > .row > .mt-3 > .form-control').click({ force: true }).clear({ force: true }).type("10", { force: true })

    // เช็คราคา
    cy.get('#pricetotal').should("contain.text", "270.00")
    cy.get('#afterDiscount').should("contain.text", "270.00")
    cy.get('#paymentPrice').should("contain.text", "288.90")
    check

    // เปิดใบเสนอราคา
    cy.get('#btncreateQuotation').click()
    cy.get('.swal2-confirm').click()

    // เช็ครายการใบเสนอราคา
    cy.get('#jobrepair-0 > :nth-child(2)').should("contain.text", "ลูกค้า")
    cy.get('#jobrepair-0 > :nth-child(5)').should("contain.text", "270.00")
    cy.get('#jobrepair-0 > :nth-child(8) > .status-border').should("contain.text", "รอลูกค้ายืนยัน")
}
const check = () => {
    const job = [
        {
            price: 300,
            qty: 1,
            discount: 30,
        }
    ]

    // ราคาทั้งหมด
    let Price = 0
    job.map(job => {
        Price += job.price * job.qty
    })
    // ส่วนลดรายชิ้น
    let discount = 0
    job.map(job => {
        discount += (job.price * job.qty) - job.discount
    })
    // // ส่วนลดท้ายบิล ถ้ามี
    // let job_discount = 0
    // job.map(job => {
    //     job_discount += (job.price - job.discount) * (100 - 10) / 100
    // })

    // ราคาบวก vat ท้ายบิล
    let paymentPrice = 0
    job.map(job => {
        paymentPrice += ((job.price * job.qty) - job.discount) * 1.07
    })

    cy.log(Price)
    cy.log(discount)
    // cy.log(job_discount)
    cy.log(paymentPrice)

    cy.get('#afterDiscount').contains(discount)
    // cy.get('#paymentPrice').contains(paymentPrice)
}
const start_job = () => {
    cy.wait(1000)
    cy.visit("https://herodemo.autopair.co/workshop/quotation/info/88")
    cy.wait(1000)

    // สถานะรอลูกค้ายืนยัน
    cy.get('.status-border').contains("รอลูกค้ายืนยัน")
    cy.get('#podata-0').contains("เพิ่มแม็ก")
    // cy.get('#podatades-0').contains("test")
    cy.get('#totalPrice').contains("270.00")
    cy.get('#afterDiscount').contains("270.00")
    cy.get('#paymentPrice').contains("288.90")

    check()

    cy.get('#btngotoCreate').click()

    // ใส่ข้อมูลพนักงานซ่อม
    cy.get('#selSelectmechanicId').click({ force: true }).type("ช่างซ่อม", { force: true }).type("{downarrow}{downarrow}{enter}", { force: true })

    cy.get('#magdata-0').contains("เพิ่มแม็ก")
    cy.get('#partproductlatestSalePricetotal-0').contains("270.00")
    cy.get('#afterDiscount').contains("270.00")
    cy.get('#paymentPrice').contains("288.90")
    check()

    // เปิดงานซ่อม
    cy.get('#btncreateWalkInWorkshopJob').click({ force: true })
    cy.get('.swal2-confirm').click()

    // เช็คเปิดงานซ่อมจากใบเสนอราคา
    cy.get('#tab-งานซ่อม').click({ force: true })
    cy.get('#jobrepair-0 > :nth-child(2)').should("contain.text", "ลูกค้า")
    cy.get('#jobrepair-0 > :nth-child(6)').should("contain.text", "288.90")
    cy.get('#jobrepair-0 > [style="width: 12rem;"] > .status-border').should("contain.text", "รอซ่อมบำรุง")
}
const start_job1 = () => {
    cy.wait(1000);
    cy.visit("https://herodemo.autopair.co/workshop/jobs/ATH-00294-0322-0046")
    cy.wait(1000);

    // สถานะรอซ่อมบำรุง
    cy.get('.status-border').contains("รอซ่อมบำรุง")
    cy.get('#podata-0').contains("เพิ่มแม็ก")
    // cy.get('#podatades-0').contains("test")
    cy.get('#totalPrice').contains("270.00")
    cy.get('#afterDiscount').contains("270.00")
    cy.get('#paymentPrice').contains("288.90")
    check()

    cy.get('#btnrecheckConfirmstart').click()
    cy.get('.swal2-confirm').click()
    cy.wait(500);
    cy.get('.swal2-confirm').click()

    // สถานะกำลังซ่อมบำรุง
    cy.get('.status-border').contains("กำลังซ่อมบำรุง")
    cy.get('#podata-0').contains("เพิ่มแม็ก")
    // cy.get('#podatades-0').contains("test")
    cy.get('#totalPrice').contains("270.00")
    cy.get('#afterDiscount').contains("270.00")
    cy.get('#paymentPrice').contains("288.90")
    check()

    cy.get('#paymentModal').click()
    cy.get('#btnrecheckConfirmfinish').click()
    cy.get('.swal2-confirm').click()
    cy.wait(2000)
    cy.get('.swal2-confirm').click()

    // สถานะซ่อมบำรุงเสร็จสิ้น
    cy.get('.status-border').contains("รายการเสร็จสิ้น")
    cy.get('#podata-0').contains("เพิ่มแม็ก")
    // cy.get('#podatades-0').contains("test")
    cy.get('#totalPrice').contains("270.00")
    cy.get('#afterDiscount').contains("270.00")
    cy.get('#paymentPrice').contains("288.90")
    check()

    cy.get('#btnBack').click()
}
const check_job = () => {
    cy.get('#jobrepair-0 > :nth-child(2)').contains("ลูกค้า")
    cy.get('#jobrepair-0 > :nth-child(6)').contains("288.90")
    cy.get('#jobrepair-0 > [style="width: 12rem;"] > .status-border').contains("รายการเสร็จสิ้น")

}