'use client';

import "../css/main.css";
import "../css/season-sports.css";
import Image from "next/image";
import Link from 'next/link';

import { motion } from "framer-motion";

export default function SeasonSports() {   
    
    return (
        <main className="overflow-hidden">
            {/* banner */}
            <section className="background-picture-ss d-flex flex-column justify-content-center mb-5">
                <Link href="/sports-page" className="back-icon">
                        <Image
                            height={500}
                            width={500}
                            src="/images/return-arrow.png"
                            alt=""
                            className="back-arrow"
                        />

                </Link>
                <div className="container">
                    <div className="row mt-5 mt-md-0">
                        <div className="col-12 text-center">
                            <h1 className="fs-80">Girls varsity volleyball</h1>
                        </div>
                    </div>
                </div>
            </section>
            {/* coach */}
            <section>
                <div className="container mb-5">
                    <div className="row">
                        <div className="offset-3 col-6 offset-md-0 col-md-2 mb-4">
                            <Image
                                height={500}
                                width={500}
                                src="/images/large_G4hZetRpq1SkVHl28fyQ_IMG_2837.jpg.avif"
                                className="border border-warning border-5 rounded-circle text-margin w-100 h-auto"
                                alt="..."
                            />
                        </div>
                        <div className="col-12 col-md-10">
                            <h2 className="blue-text">coach jason derulo</h2>
                            <p className="text-black text-roboto">
                                U14 Girls volleyball is a team that Sed ut
                                perspiciatis unde omnis iste natus error sit
                                voluptatem accusantium doloremque laudantium,
                                totam rem aperiam, eaque ipsa quae ab illo
                                inventore veritatis et quasi architecto beatae
                                vitae dicta sunt explicabo. Nemo enim ipsam
                                voluptatem quia voluptas sit aspernatur aut odit
                                aut fugit, sed quia consequuntur magni dolores
                                eos qui ratione voluptatem sequi nesciunt. Neque
                                porro quisquam est, qui dolorem ipsum quia dolor
                                sit amet, consectetur, adipisci velit, sed quia
                                non numquam eius modi tempora incidunt ut labore
                                et dolore magnam aliquam quaerat voluptatem. Ut
                                enim ad minima veniam, quis nostrum
                                exercitationem ullam corporis suscipit
                                laboriosam, nisi ut aliquid ex ea commodi
                                consequatur?
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className="container">
                    <div className="row">
                        <motion.div className="col-12 blue-text" initial={{ opacity: 0, y: "100px"}} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "Tween", stiffness: 100 }}>
                            <h2>recent games</h2>
                        </motion.div>
                    </div>
                    <div className="row mb-5">
                        <div className="col-12">
                            <motion.div className="card p-2 bg-sblue" initial={{ opacity: 0, y: "100px"}} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "Tween", stiffness: 100 }}>
                                <motion.div className="card-body pb-5" initial={{ opacity: 0, y: "100px"}} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "Tween", stiffness: 100 }}>
                                    <div className="row">
                                        <div className="col-12 fs-3 text-white fw-bold">
                                            bps x ris u14 volleyball
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 fs-6 yellow-text text-margin">
                                            JULY 7th, 2024 | GODBOUT HALL
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className="container mb-5">
                    <div className="row">
                        <motion.div className="col-12" initial={{ opacity: 0, y: "100px"}} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "Tween", stiffness: 100 }}>
                            <h1 className="blue-text text-center fs-64">
                                season 14
                            </h1>
                        </motion.div>
                    </div>
                    <div className="row">
                        <motion.div className="col-12 offset-lg-1 col-lg-10 text-center" initial={{ opacity: 0, y: "100px"}} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "Tween", stiffness: 100 }}>
                            <Image
                                height={500}
                                width={500}
                                src="/images/spiking.jpeg"
                                alt=""
                                className="s-image rounded-3 mb-4 w-100"
                            />
                        </motion.div>
                    </div>
                    <div className="row">
                        <motion.div className="col-12 offset-lg-1 col-lg-10" initial={{ opacity: 0, y: "100px"}} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "Tween", stiffness: 100 }}>
                            <p className="text-black text-roboto">
                                Season 14&apos;s team is comprised of Jessica,
                                Jessica, Jessica, and Jessica. Sed ut
                                perspiciatis unde omnis iste natus error sit
                                voluptatem accusantium doloremque laudantium,
                                totam rem aperiam, eaque ipsa quae ab illo
                                inventore veritatis et quasi architecto beatae
                                vitae dicta sunt explicabo. AWAY GAME: VIETNAM
                                Season 14&apos;s team went to vietnam to do the
                                griddy. They came home with a silver medal. Sed
                                ut perspiciatis unde omnis iste natus error sit
                                voluptatem accusantium doloremque laudantium,
                                totam rem aperiam, eaque ipsa quae ab illo
                                inventore veritatis et quasi architecto beatae
                                vitae dicta sunt explicabo.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>
            <section className="bg-my-grey">
                <div className="container">
                    <div className="row">
                        <motion.div className="col-12 text-center my-4" initial={{ opacity: 0, y: "100px"}} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "Tween", stiffness: 100 }}>
                            <h2>Awards</h2>
                        </motion.div>
                    </div>
                    <div className="row">
                        <motion.div className="col-12" initial={{ opacity: 0, y: "50px"}} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "Tween", stiffness: 100 }}>
                            <h5>seasac 2014 gold medal</h5>
                            <p className="text-roboto grey-text text-margin">
                                volleyball team won silver medal
                            </p>
                            <hr />
                        </motion.div>
                    </div>
                    <div className="row">
                        <motion.div className="col-12" initial={{ opacity: 0, y: "50px"}} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "Tween", stiffness: 100 }}>
                            <h5>seasac 2014 gold medal</h5>
                            <p className="text-roboto grey-text text-margin">
                                volleyball team won silver medal
                            </p>
                            <hr />
                        </motion.div>
                    </div>
                    <div className="row">
                        <motion.div className="col-12" initial={{ opacity: 0, y: "50px"}} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "Tween", stiffness: 100 }}>
                            <h5>seasac 2014 gold medal</h5>
                            <p className="text-roboto grey-text text-margin">
                                volleyball team won silver medal
                            </p>
                            <hr />
                        </motion.div>
                    </div>
                    <div className="row">
                        <motion.div className="col-12" initial={{ opacity: 0, y: "50px"}} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "Tween", stiffness: 100 }}>
                            <h5>seasac 2014 gold medal</h5>
                            <p className="text-roboto grey-text text-margin">
                                volleyball team won silver medal
                            </p>
                            <hr />
                        </motion.div>
                    </div>
                    <div className="row">
                        <motion.div className="col-12" initial={{ opacity: 0, y: "50px"}} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "Tween", stiffness: 100 }}>
                            <h5>seasac 2014 gold medal</h5>
                            <p className="text-roboto grey-text text-margin">
                                volleyball team won silver medal
                            </p>
                            <hr />
                        </motion.div>
                    </div>
                </div>
            </section>
        </main>
    );
}
